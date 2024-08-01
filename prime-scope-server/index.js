const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// config
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174", "https://prime-scope.web.app"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// verify jwt middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized Access!" });
  }
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Unauthorized Access!" });
      }
      req.user = decoded;
      next();
    });
  }
};

//--------------------- database connection-----------------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@revive.2tkcldw.mongodb.net/?appName=Revive`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const database = client.db("primeScopeDB");
    const jobCollection = database.collection("jobs");
    const applyCollection = database.collection("applies");

    // JWT Generate
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // clear token with logout
    app.get("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 0,
        })
        .send({ success: true });
    });

    // get all jobs data
    app.get("/jobs", async (req, res) => {
      const result = await jobCollection.find().toArray();
      res.send(result);
    });

    // get a single jobs data
    app.get("/job/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobCollection.findOne(query);
      res.send(result);
    });

    // save a apply Data for applicant
    app.post("/apply", async (req, res) => {
      const applyData = req.body;

      // check Duplicate request
      const query = {
        email: applyData.email,
        jobId: applyData.jobId,
      };

      const alreadyApplied = await applyCollection.findOne(query);

      if (alreadyApplied) {
        return res
          .status(400)
          .send("You have already made a proposal for this job!");
      }

      const result = await applyCollection.insertOne(applyData);

      // update apply count in jobs collection
      const updateDoc = {
        $inc: { apply_count: 1 },
      };

      const jobQuery = { _id: new ObjectId(applyData.jobId) };
      const updateApplyCount = await jobCollection.updateOne(
        jobQuery,
        updateDoc
      );

      res.send(result);
    });

    // save a job data
    app.post("/job", async (req, res) => {
      const jobData = req.body;
      const result = await jobCollection.insertOne(jobData);
      res.send(result);
    });

    // get all jobs posted by a specific owner
    app.get("/jobs/:email", verifyToken, async (req, res) => {
      const tokenEmail = req.user.email;
      const email = req.params.email;
      if (tokenEmail !== email) {
        return res.status(403).send({ message: "Forbidden Access!" });
      }
      const query = { "owner.email": email };
      const result = await jobCollection.find(query).toArray();
      res.send(result);
    });

    // delete a job data by owner
    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobCollection.deleteOne(query);
      res.send(result);
    });

    // update a job data
    app.put("/job/:id", async (req, res) => {
      const id = req.params.id;
      const updatedJobData = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...updatedJobData,
        },
      };
      const result = await jobCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    // get all applies by specific user
    app.get("/myApplies/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await applyCollection.find(query).toArray();
      res.send(result);
    });

    // get all jobs data for pagination
    app.get("/allJobs", async (req, res) => {
      const size = parseInt(req.query.size);
      const page = parseInt(req.query.page);
      const sort = req.query.sort;
      const search = req.query.search;

      let query = {
        title: { $regex: search, $options: "i" },
      };

      let options = {};

      if (sort) {
        options = { sort: { application_deadline: sort === "asc" ? 1 : -1 } };
      }

      const result = await jobCollection
        .find(query)
        .sort({ application_deadline: sort === "asc" ? 1 : -1 })
        .skip(page * size)
        .limit(size)
        .toArray();

      res.send(result);
    });

    // get all jobs data count from db
    app.get("/jobsCount", async (req, res) => {
      const search = req.query.search;

      let query = {
        title: { $regex: search, $options: "i" },
      };

      const count = await jobCollection.countDocuments(query);
      res.send({ count });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
