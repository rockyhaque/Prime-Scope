import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAuth from "./../../hook/useAuth";
import { HiOutlineMail } from "react-icons/hi";
import { FcOvertime } from "react-icons/fc";
import { GoDiscussionOutdated } from "react-icons/go";
import { CiMoneyCheck1 } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hook/useAxiosSecure";

const JobDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bannerImageLoaded, setBannerImageLoaded] = useState(false);
  const job = useLoaderData();
  const {
    _id,
    title,
    description,
    category,
    banner_img,
    application_deadline,
    max_salary,
    min_salary,
    apply_count,
    postedDate,
    owner,
  } = job || {};

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const deadlineDate = new Date(application_deadline);

    if (currentDate > deadlineDate) {
      return toast.error("Application deadline is over. You can't apply for this job.");
    }

    if(user?.email === owner?.email){
      return toast.error("Proposal denied");
    }

    const form = e.target;
    const jobId = _id;
    const email = user?.email;
    const name = user?.displayName;
    const resumeLink = form.resumeLink.value;
    const appliedDate = new Date().toISOString().split("T")[0];

    const applyData = {
      jobId,
      title,
      category,
      owner,
      email,
      resumeLink,
      appliedDate,
      name,
      banner_img,
      owner_email: owner?.email,
      owner_name: owner?.name,
    };

    console.log(applyData);

    try {
      const response = await axiosSecure.post("/apply", applyData);
      console.log(response.data);
      toast.success("Applied Successfully!");
      // navigate('/myApplies')
    } catch (error) {
      toast.error(error.response.data);
      e.target.reset();
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto mb-16 px-3 md:px-3 lg:px-0">
      <Helmet>
        <title>Prime Scope | Details of {title}</title>
      </Helmet>
      <SectionTitle heading="Project Overview"></SectionTitle>

      <section className="flex flex-col md:flex-col lg:flex-row items-center gap-6">
        <div className="w-full md:w-1/2 border rounded-2xl p-4 relative">
          {!bannerImageLoaded && (
            <div className="skeleton h-full w-full rounded-2xl absolute inset-0"></div>
          )}
          <img
            src={banner_img}
            onLoad={() => setBannerImageLoaded(true)}
            style={{ display: imageLoaded ? "block" : "none" }}
            className="rounded-2xl"
            alt="Banner"
          />
        </div>
        <div className="w-full md:w-1/2 ">
          {/* Owner Info */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-gray-900 to-purple-900 text-gray-400 py-4 px-8 rounded-xl mt-4">
            <div>
              <div className="avatar">
                <div className="w-24 h-full rounded-xl relative">
                  {!imageLoaded && (
                    <div className="skeleton h-full w-full rounded-xl absolute inset-0"></div>
                  )}
                  <img
                    src={owner?.photo}
                    onLoad={() => setImageLoaded(true)}
                    style={{ display: imageLoaded ? "block" : "none" }}
                    className="rounded-xl"
                  />
                </div>
              </div>
              <h4 className="">{owner?.name}</h4>
            </div>
            <div className="space-y-3 mt-2 md:mt-0">
              <div className="flex justify-center items-center gap-3">
                <HiOutlineMail size={30} />
                <span>{owner?.email}</span>
              </div>
              <div className="flex  items-center gap-3">
                <GoDiscussionOutdated size={30} />
                <h5>Posted: </h5>
                <span>{postedDate}</span>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div>
            <h2 className="text-2xl font-semibold text-center my-10 bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
              {title}
            </h2>
            <span className="badge badge-lg bg-gradient-to-r from-gray-900 to-purple-900 text-gray-400">
              {category}
            </span>
            <p className="text-lg text-gray-500">{description}</p>
            <div className=" mt-4 md:mt-6 space-y-2">
              <div className="flex items-center gap-3">
                <FcOvertime size={30} />
                <p className="text-lg font-semibold">Deadline: </p>
                <span>
                  {new Date(application_deadline).toLocaleDateString()}
                </span>
              </div>
              <div className="flex  items-center gap-3">
                <CiMoneyCheck1 size={30} />
                <h5 className="text-lg font-semibold">Expected salary: </h5>
                <span>
                  {min_salary} - {max_salary}{" "}
                  <span className="font-semibold">BDT/Month</span>
                </span>
              </div>
              <div className="flex  items-center gap-3">
                <FaUserFriends size={30} />
                <h5 className="text-lg font-semibold">Applicants Applied: </h5>
                <span className="badge badge-lg bg-gradient-to-r from-gray-900 to-purple-900 text-gray-400">
                  {apply_count} <span className="font-semibold"></span>
                </span>
              </div>

              <div className="flex justify-center pt-6 md:pt-10">
                {/* modal button*/}
                <button
                  className="btn btn-sm md:btn-md lg:btn-wide bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-indigo-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Apply
                </button>
              </div>

              {/* modal dialog*/}
              <dialog id="my_modal_3" className="modal ">
                <div className="modal-box bg-gradient-to-r from-violet-50 to-fuchsia-50">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      <RxCrossCircled size={25} />
                    </button>
                  </form>
                  {/* submit form */}
                  <form onSubmit={handleFormSubmission}>
                    <div className="flex flex-col items-center justify-center my-8">
                      <div className="avatar">
                        <div className="w-24 rounded-xl">
                          <img src={user?.photoURL} />
                        </div>
                      </div>
                      <span className="badge badge-lg bg-gradient-to-r from-gray-900 to-purple-900 text-gray-400 mt-3">
                        Open To Work
                      </span>
                    </div>
                    <div className="space-y-3">
                      <label className="input input-bordered flex items-center gap-2 bg-gradient-to-r from-violet-50 to-fuchsia-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input
                          type="text"
                          className="grow"
                          value={user?.displayName}
                          placeholder="Username"
                        />
                      </label>
                      <label className="input input-bordered flex items-center gap-2 bg-gradient-to-r from-violet-50 to-fuchsia-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                          type="text"
                          className="grow"
                          value={user?.email}
                          placeholder="Email"
                        />
                      </label>

                      <label className="input input-bordered flex items-center gap-2 bg-gradient-to-r from-violet-50 to-fuchsia-50">
                        <IoDocumentsSharp className="text-gray-600" />
                        <input
                          type="text"
                          className="grow"
                          placeholder="Resume Link"
                          name="resumeLink"
                        />
                      </label>

                      <div className="flex justify-center pt-2">
                        <input
                          type="submit"
                          value="Submit"
                          className="btn btn-sm md:btn-md  bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-indigo-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetails;
