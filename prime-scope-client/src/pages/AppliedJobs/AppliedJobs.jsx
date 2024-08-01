import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { FaExternalLinkAlt } from "react-icons/fa";

import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const AppliedJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [applies, setApplies] = useState([]);

  useEffect(() => {
    getData();
  }, [user]);

  const getData = async () => {
    const { data } = await axiosSecure(`/myApplies/${user?.email}`);
    setApplies(data);
  };

  return (
    <div>
      <Helmet>
        <title>Prime Scope | Applied Jobs</title>
      </Helmet>
      
      <section className="container px-4 mx-auto">
        <SectionTitle heading="My Applied Jobs" description=""></SectionTitle>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              {applies.length === 0 ? (
                <div className="p-6 my-10 text-center text-gray-700 dark:text-gray-500 text-xl">
                  No posted apply Available
                </div>
              ) : (
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg mb-10">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-70">
                    <thead className="bg-[#1A1D2B]">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-3">
                            <span>Job Info</span>
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
                          Applied
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Employer Email
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Resume Link
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-gradient-to-r from-zinc-800 to-slate-900">
                      {applies.map((apply) => (
                        <tr key={apply._id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="flex items-center gap-x-2">
                                <div className="avatar">
                                  <div className="w-16 rounded-xl">
                                    <img src={apply.banner_img} />
                                  </div>
                                </div>
                                <div>
                                  <h2 className="font-medium text-gray-800 dark:text-white ">
                                    {apply.title}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-purple-100/60 dark:bg-gray-800 ">
                              <h2
                                className={`text-sm font-normal ${
                                  apply.category === "On Site" &&
                                  "text-blue-500"
                                } ${
                                  apply.category === "Remote" &&
                                  "text-green-500"
                                } ${
                                  apply.category === "Hybrid" &&
                                  "text-purple-500"
                                } ${
                                  apply.category === "Part Time" &&
                                  "text-pink-500"
                                } `}
                              >
                                {apply.category}
                              </h2>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {new Date(apply.appliedDate).toLocaleDateString()}
                          </td>

                          <td>
                            <h2 className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-purple-100/60 dark:bg-gray-800 text-purple-500 ">
                              {apply.email}
                            </h2>
                          </td>

                          <td>
                            <h2>
                              <FaExternalLinkAlt
                                className="ml-4 text-gray-400"
                                size={25}
                              />
                            </h2>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppliedJobs;
