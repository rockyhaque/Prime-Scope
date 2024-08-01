import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { VscDebugRestart } from "react-icons/vsc";
import { Helmet } from "react-helmet";

const AllJobs = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/allJobs?page=${currentPage}&size=${itemsPerPage}&sort=${sort}&search=${search}`
      );
      setJobs(data);
      console.log(jobs);
    };
    getData();
  }, [currentPage, itemsPerPage, sort, search]);

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/jobsCount?search=${search}`
      );

      setCount(data.count);
    };
    getCount();
  }, [search]);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  // handle pagination button;
  const handlePagination = (value) => {
    setCurrentPage(value);
  };

  // handle reset
  const handleReset = () => {
    setSort("");
    setSearch("");
    setSearchText("");
  };

  // search
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <Helmet>
        <title>Prime Scope | All Jobs</title>
      </Helmet>
      
      <div>
        {/* search */}
        <div>
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-purple-400 focus-within:ring-purple-300">
              <input
                className="w-full px-4 py-4 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent rounded-lg"
                type="text"
                name="search"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                placeholder="Search by Job Title"
                aria-label="Enter Job Title"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-300 transform bg-purple-600 rounded-r-lg hover:bg-purple-400 focus:outline-none focus:bg-purple-400"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-6 ">
          {/* sorting */}
          <div>
            <select
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
              value={sort}
              name="sort"
              id="sort"
              className="border p-4 rounded-md cursor-pointer"
            >
              <option value="">Sort By Deadline</option>
              <option value="dsc">Descending Order</option>
              <option value="asc">Ascending Order</option>
            </select>
          </div>

          {/* reset */}
          <button onClick={handleReset} className="btn">
            <VscDebugRestart />
          </button>
        </div>

        {/*------------- Table----------- */}

        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg mt-10">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-[#1A1D2B]">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  <div className="flex items-center gap-x-3">
                    <span>Job Service</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  <button className="flex items-center gap-x-2">
                    <span>Category</span>
                    <svg
                      className="h-3"
                      viewBox="0 0 10 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.1"
                      />
                      <path
                        d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.1"
                      />
                      <path
                        d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.3"
                      />
                    </svg>
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  <button className="flex items-center gap-x-2">
                    <span>Salary</span>
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  Deadline
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  Details
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-gradient-to-r from-slate-900 to-zinc-800">
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center gap-x-3">
                      <div className="flex items-center gap-x-2">
                        <div className="avatar">
                          <div className="w-16 rounded-xl">
                            <img src={job.banner_img} />
                          </div>
                        </div>
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white ">
                            {job.title}
                          </h2>
                          <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                            @{job.owner?.name.toLowerCase().replace(/\s/g, "")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-purple-100/60 dark:bg-gray-800 ">
                      <h2
                        className={`text-sm font-normal ${
                          job.category === "On Site" && "text-blue-500"
                        } ${job.category === "Remote" && "text-green-500"} ${
                          job.category === "Hybrid" && "text-purple-500"
                        } ${job.category === "Part Time" && "text-pink-500"}`}
                      >
                        {job.category}
                      </h2>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {job.min_salary} - {job.max_salary}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                    {new Date(job.application_deadline).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-x-6">
                      {/* update button */}
                      <Link
                        to={`/job/${job._id}`}
                        className="text-gray-500 transition-colors duration-200 dark:hover:text-purple-700 dark:text-gray-300 hover:text-purple-700 focus:outline-none"
                      >
                        <button className="btn btn-sm ">View Details</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}

      <div className="flex justify-center mt-12 ">
        {/* previous button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePagination(currentPage - 1)}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-purple-500  hover:text-white mr-16"
        >
          <div className="flex items-center -mx-1">
            <GrFormPrevious />
          </div>
        </button>

        {/* Numbers */}
        {pages.map((btnNum) => (
          <button
            onClick={() => handlePagination(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum ? "bg-purple-500 text-white" : ""
            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-full sm:inline hover:bg-purple-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        {/* Next Button */}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePagination(currentPage + 1)}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-purple-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500 ml-16"
        >
          <div className="flex items-center -mx-1">
            <GrFormNext />
          </div>
        </button>
      </div>
    </div>
  );
};

export default AllJobs;
