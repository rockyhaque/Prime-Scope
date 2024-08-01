import axios from "axios";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAuth from "../../hook/useAuth";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const AddJob = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const min_salary = parseFloat(form.min_salary.value);
    const max_salary = parseFloat(form.max_salary.value);
    if (min_salary > max_salary) {
      return toast.error("Your Maximum Price is lower than Minimum Price");
    }
    const category = form.category.value;
    const email = form.email.value;
    const description = form.description.value;
    const application_deadline = startDate;
    const banner_img = form.banner_img.value;
    const postedDate = new Date().toISOString().split("T")[0];
    const postedTime = new Date().toTimeString().split(' ')[0];

    const jobData = {
        title,
      description,
      min_salary,
      max_salary,
      application_deadline,
      category,
      banner_img,
      postedDate,
      postedTime,
      owner: {
        email,
        name: user?.displayName,
        photo: user?.photoURL
      },
      apply_count: 0
      
    };

    console.table(jobData);

    try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/job`,
          jobData
        );
        console.log(response.data);
        if (response.data.insertedId) {
          {
            toast.success("Your job post is Successfully Published");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(error);
      }

  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <Helmet>
        <title>Prime Scope | Add Job</title>
      </Helmet>
      {/* heading */}
      <SectionTitle heading="Publish A Job" description=""></SectionTitle>

      {/* form */}

      <form onSubmit={handleFormSubmission}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-8 md:pt-12 lg:pt-12">
          {/* Title */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-xl font-semibold">
                Job Title
              </span>
            </div>
            <input
              type="text"
              name="title"
              placeholder="Responsive Website Design"
              className="input input-bordered w-full "
            />
          </label>

          {/* Category */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-xl font-semibold">Category</span>
            </div>
            <select className="select select-bordered" name="category">
              <option disabled selected>
                Select one
              </option>
              <option>On Site</option>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>Part Time</option>
            </select>
          </label>

          {/* Email */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-xl font-semibold">Email</span>
            </div>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              placeholder="email@example.com"
              className="input input-bordered w-full"
              readOnly
            />
          </label>

          {/* deadline */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-xl font-semibold">Deadline</span>
            </div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="input input-bordered w-full cursor-pointer"
              placeholderText=""
              dateFormat="yyyy-MM-dd"
            />
          </label>

          {/* min price */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-xl font-semibold">
                Min Price
              </span>
            </div>
            <input
              type="number"
              name="min_salary"
              placeholder="200"
              className="input input-bordered w-full "
            />
          </label>

          {/* max price */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-xl font-semibold">
                Max Price
              </span>
            </div>
            <input
              type="number"
              name="max_salary"
              placeholder="10000"
              className="input input-bordered w-full "
            />
          </label>
        </div>

        {/* Img URL */}
        <label className="form-control w-full mt-7">
          <div className="label">
            <span className="label-text text-xl font-semibold">Image URL</span>
          </div>
          <input
            type="text"
            name="banner_img"
            placeholder="http://yourimglink.com"
            className="input input-bordered w-full "
          />
        </label>

        {/* description */}
        <label className="form-control mt-7">
          <div className="label">
            <span className="label-text text-xl font-semibold">
              Description
            </span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            name="description"
            placeholder="Our Responsive Website Design service ensures your website looks great and functions perfectly on all devices..."
          ></textarea>
        </label>

        {/* post button */}
        <div className="text-center my-12">
          <input
            type="submit"
            className="px-24 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-indigo-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 text-xl"
            value="Post"
          />
        </div>
      </form>
    </div>
  );
};

export default AddJob;
