import { IoPricetagOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hook/useAuth";
import toast from "react-hot-toast";

const JobCard = ({ job }) => {
  const {
    _id,
    title,
    description,
    category,
    banner_img,
    application_deadline,
    rating,
    max_salary,
    min_salary,
    applicants_number,
    owner_email,
    owner_name,
    posting_date,
  } = job || {};
  const [imageLoaded, setImageLoaded] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewDetailsClick = () => {
    if (!user) {
      toast.error("You have to log in first to view details.");
      navigate("/login");
    } else {
      navigate(`/job/${_id}`);
    }
  };

  return (
    <div className="mt-4 ">
      <div className="flex flex-col md:flex-row items-center gap-8 p-5 w-full border border-indigo-300 rounded-2xl hover:shadow-2xl hover:shadow-indigo-200 ">
        <div className="w-full md:w-1/2">
          {" "}
          {/* Set the image div to 40% width */}
          <div className="relative h-64 w-full">
            {!imageLoaded && (
              <div className="absolute top-0 left-0 w-full h-full shadow-2xl rounded-lg overflow-hidden skeleton"></div>
            )}
            <img
              src={banner_img}
              onLoad={() => setImageLoaded(true)}
              style={{ display: imageLoaded ? "block" : "none" }}
              className="absolute top-0 left-0 shadow-2xl rounded-lg overflow-hidden border h-64 w-full object-cover"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center gap-2">
            <h4 className="font-bold text-xl">{title}</h4>
            
          </div>
          <p className="badge badge-lg bg-slate-800 text-slate-200">
            {category}
          </p>
          <p className="mt-4 mb-2 text-gray-600">
            {description.slice(0, 68)}...
          </p>
          <hr />
          <div className="flex flex-col justify-between gap-3">
            <div className="flex items-center gap-2 mt-2">
              <IoPricetagOutline size={20} className="font-bold" />
              <h6 className="font-semibold">
                {max_salary}-{min_salary}
              </h6>
              <span>BDT</span>
            </div>
            <div className="flex items-center gap-2">
              <CiCalendar size={20} className="font-bold" />
              <h6 className="font-semibold">
                {new Date(application_deadline).toLocaleDateString()}
              </h6>
            </div>
          </div>
          <div className="mt-5">
            <Link
            to={`/job/${_id}`}
              onClick={handleViewDetailsClick}
              type="button"
              className="btn btn-sm md:btn-md bg-gray-800 text-sm text-white shadow-sm transform transition-transform duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
