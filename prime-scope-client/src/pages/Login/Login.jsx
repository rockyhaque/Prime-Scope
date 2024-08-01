import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../../hook/useAuth";
import { Helmet } from 'react-helmet';

const Login = () => {

    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const { googleLogin, githubLogin, setUser, loginUser } = useAuth();

    // react hook form
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm();
  
    const onSubmit = async (data) => {
      const { email, password } = data;
  
      try {
        // Login user
        const result = await loginUser(email, password);
        setUser(result.user);
  
        // Request JWT token
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email }
          );
          const token = response.data.token;
          console.log(token);
          // Optionally, you might want to store the token in local storage or state
          localStorage.setItem("jwtToken", token);
        } catch (jwtError) {
          console.error("JWT Error:", jwtError);
          toast.error(`Failed to retrieve JWT: ${jwtError.message}`);
        }
  
        toast.success("User Log In Successfully 🤩");
        navigate(location?.state ? location.state : "/");
      } catch (error) {
        setError(error.message);
        toast.error(`Oops! ${error.message}`);
      }
  
      reset();
    };
  
    const handleGoogleLogin = async () => {
      try {
        const result = await googleLogin();
        setUser(result.user);
        console.log(result.user);
  
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          {
            email: result?.user?.email,
          },
          { withCredentials: true }
        );
  
        console.log(data);
  
        toast.success("Logged In Successfully 🤩");
        navigate(location?.state ? location.state : "/");
      } catch (error) {
        setError(error.message);
        toast.error(`Oops! ${error.message}`);
      }
    };
  
    const handleGithubLogin = async () => {
      try {
        const result = await githubLogin();
        setUser(result.user);
        toast.success("Logged In Successfully 🤩");
  
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            {
              email: result?.user?.email,
            }
          );
          console.log(data);
        } catch (jwtError) {
          console.error("JWT Error:", jwtError);
          toast.error(`Failed to retrieve JWT: ${jwtError.message}`);
        }
  
        navigate(location?.state ? location.state : "/");
      } catch (error) {
        setError(error.message);
        toast.error(`Oops! ${error.message}`);
      }
    };



    return (
        <div className=" flex justify-center items-center py-4 md:py-10 lg:py-28">
          <Helmet>
        <title>Prime Scope | Login</title>
      </Helmet>
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
          <div
            id="back-div"
            className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4"
          >
            <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
              <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-4xl text-center cursor-default">
                Login Now!
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="mb-2  dark:text-gray-400 text-lg">
                    Email
                  </label>
                  <input
                    className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="email"
                    name="email"
                    placeholder="rockyhaque@gmail.com"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500 font-semibold text-md mt-1">
                      *Email is required
                    </span>
                  )}
                </div>
  
                {/* password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 dark:text-gray-400 text-lg"
                  >
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type={showPass ? "text" : "password"}
                      name="password"
                      placeholder="Your Password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern:
                          /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      })}
                    />
                    <span
                      className="absolute right-3 cursor-pointer text-xl"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <IoEyeOffOutline /> : <MdOutlineRemoveRedEye />}
                    </span>
                  </div>
                  {errors.password?.type === "required" && (
                    <span className="text-red-500 font-semibold text-md mt-2">
                      Password is required
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-500 font-semibold text-md mt-2">
                      Password Must be 6 characters
                    </span>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <span className="text-red-500 font-semibold text-md mt-2">
                      Password Must be less than 20 characters
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-500 font-semibold text-md mt-2">
                      Password must have one Uppercase one lower case, one number
                      and one special character.
                    </span>
                  )}
                </div>
                <a
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                  href="#"
                >
                  <span className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Forget your password?
                  </span>
                </a>
                <button
                  className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                  type="submit"
                >
                  LOGIN
                </button>
              </form>
              <div className="flex flex-col mt-4 items-center justify-center text-sm">
                <h3 className="dark:text-gray-300">
                  If you are new here then
                  <a
                    className="group text-blue-400 transition-all duration-100 ease-in-out"
                    href="#"
                  >
                    <Link
                      to="/register"
                      className="ml-1 bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                    >
                      Register
                    </Link>
                  </a>
                </h3>
              </div>
  
              {/* Third Party Authentication Options */}
              <div
                id="third-party-auth"
                className="flex items-center justify-center mt-5 flex-wrap"
              >
                <button
                  onClick={handleGoogleLogin}
                  className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                >
                  <img
                    className="max-w-[25px]"
                    src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                    alt="Google"
                  />
                </button>
  
                <button
                  onClick={handleGithubLogin}
                  className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                >
                  <img
                    className="max-w-[25px] filter dark:invert"
                    src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                    alt="Github"
                  />
                </button>
              </div>
  
              {/* Terms and policy */}
              <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm">
                <p className="cursor-default">
                  By signing in, you agree to our
                  <a
                    className="group text-blue-400 transition-all duration-100 ease-in-out"
                    href="#"
                  >
                    <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                      Terms
                    </span>
                  </a>
                  and
                  <a
                    className="group text-blue-400 transition-all duration-100 ease-in-out"
                    href="#"
                  >
                    <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                      Privacy Policy
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;