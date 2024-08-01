const Blog = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div>
        <h1 className="text-center text-3xl font-bold mt-20">
          Welcome To My Book Blog
        </h1>
      </div>
      <div className="collapse collapse-plus bg-base-200 mt-20 mb-4">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-lg font-bold">
          What is an access token and refresh token?
        </div>
        <div className="collapse-content">
          <p className="mt-10">
            <span className="text-md font-bold">Access Token 📚</span>
            <br />
            Objective: Temporary credential to communication with secret
            resources. <br /> Storage: State or HTTP-only cookies in memory
            <br /> <br />
            <span className="text-md font-bold">Refresh Token 📚</span>
            <br />
            Use: A long lived credential for fetching new access_tokens <br />{" "}
            Storage: http only secure cookies
            <br />
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-lg font-bold">
          How do they work and where should we store them on the client side?
        </div>
        <div className="collapse-content">
          <p>
            Server issues access and refresh tokens on successful login. Get
            Resources: Get Protected Resource Using Access Token Token Expire:
            when required use refresh token to renew access token. Security
            Access TokenStore in memory to prevent persistence risks. Refresh
            Token: The Http only cookies to store the actual token and prevent
            XSS or CSRF attacks.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-lg font-bold">What is Nest JS</div>
        <div className="collapse-content">
          <p>
            NestJS is a progressive Node.js framework for building efficient and
            scalable server-side applications. Key points include:
            <br />
            <br />
            1. Built with TypeScript:
            <br />
            Fully supports and encourages the use of TypeScript.
            <br />
            <br />
            2. Modular Architecture:
            <br />
            Allows for the organization of code into modules, enhancing
            maintainability and scalability.
            <br />
            <br />
            3. Inspired by Angular:
            <br />
            Uses a similar design and dependency injection system, making it
            familiar to Angular developers.
            <br />
            <br />
            4. Built-in Support:
            <br />
            Provides robust tools for building RESTful APIs, GraphQL APIs,
            WebSockets, and more.
            <br />
            <br />
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mt-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-lg font-bold">
          What is express js?
        </div>
        <div className="collapse-content">
          <p>
            Express.js is a minimal and flexible Node.js web application
            framework that provides a robust set of features to develop web and
            mobile applications. Here are the key points:
            <br />
            <br />
            1. Framework for Node.js: 🤝
            <br />
            Express.js is designed for building web applications and APIs with
            Node.js.
            <br />
            <br />
            2. Minimal and Flexible: 🌍
            <br />
            It&apos;s lightweight with a minimalistic core but highly flexible
            through middleware and plugins.
            <br />
            <br />
            3. Features 🏆
            <li> Simplifies handling of HTTP requests and responses.</li>
            <li>
              {" "}
              Supports middleware to handle various tasks like logging,
              authentication, etc.
            </li>
            <li>
              {" "}
              Provides robust routing for managing different HTTP methods and
              URL paths.
            </li>
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 my-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-lg font-bold">My Project About</div>
        <div className="collapse-content">
          <p>
            Prime Scope offers a comprehensive suite of features designed to
            facilitate both freelancers and employers in managing their work and
            job applications efficiently. Here are the detailed features:
            <br />
            <br />
            1. Job Posting and Management
            <br />
            Add Job: Employers can post new job listings, specifying details
            such as job title, description, category, salary range, and
            application deadlines.
            <br />
 
            My Posted Jobs: Employers can view and manage all the jobs they have
            posted, track applications, and update job details as necessary.
            <br />
            <br />
            2. Job Search and Application
            <br />
            Search Jobs: Users can search for jobs based on various criteria
            including job title, category, and location. <br /> Applied Jobs:
            Freelancers can view a list of jobs they have applied for, keeping
            track of their application status.
            <br />
            <br />
            3. User Profiles
            <li>
              {" "}
              Employer Profiles: Employers can create and update profiles showcasing their company information and job postings.

            </li>
            <li>
              {" "}
              Freelancer Profiles: Freelancers can create profiles, upload resumes, and display their skills and work experience.
            </li>

            <br />

            <p>And So more...</p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
