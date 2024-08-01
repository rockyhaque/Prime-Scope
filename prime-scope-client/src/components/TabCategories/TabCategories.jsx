import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import axios from "axios";
import JobCard from "../JobCard/JobCard";
import { Helmet } from "react-helmet";

const TabCategories = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/jobs`);
      setJobs(data);
    };
    getData();
  }, []);



  if (jobs.length === 0) {
    return (
      <div className="flex flex-col md:flex-row items-center justify-center my-20 gap-10">
        <div className="flex w-72 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex w-72 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Prime Scope | Home</title>
      </Helmet>

      {/* heading */}
      <SectionTitle
        heading="Our Service"
        description="Find flexible part-time roles ideal for boosting your income and career. Explore a variety of opportunities to fit your schedule."
      ></SectionTitle>

      {/* Categories */}
      <Tabs >
        <div className=" max-w-screen-xl mx-auto py-4 md:py-8 lg:py-8">
          <TabList className="flex items-center justify-center text-sm md:text-xl font-normal md:font-semibold border-b-2 border-gray-300 ">
            <Tab>On Site</Tab>
            <Tab>Remote</Tab>
            <Tab>Hybrid</Tab>
            <Tab>Part Time</Tab>
            <Tab>All Category</Tab>
          </TabList>

          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 place-items-center ">
              {jobs
                .filter((item) => item.category === "On Site")
                .map((job) => (
                  <JobCard key={job._id} job={job}></JobCard>
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 place-items-center ">
              {jobs
                .filter((item) => item.category === "Remote")
                .map((job) => (
                  <JobCard key={job._id} job={job}></JobCard>
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 place-items-center ">
              {jobs
                .filter((item) => item.category === "Hybrid")
                .map((job) => (
                  <JobCard key={job._id} job={job}></JobCard>
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 place-items-center ">
              {jobs
                .filter((item) => item.category === "Part Time")
                .map((job) => (
                  <JobCard key={job._id} job={job}></JobCard>
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 place-items-center ">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job}></JobCard>
              ))}
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default TabCategories;
