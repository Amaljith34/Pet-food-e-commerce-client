// import React, { useState } from "react";
// import Logo from "../../../Assets/Logo white.png";
// import { Link, useNavigate } from "react-router-dom";
// import * as yup from "yup";
// import toast from "react-hot-toast";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import { useDispatch } from "react-redux";
// import { login } from "../../../../Redux/logSlice/logSlice";
// import api from "../../../../utils/axios";


// const LoginPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [showPopup, setShowPopup] = useState(false);

//   const validationSchema = yup.object({
//     email: yup
//       .string()
//       .email("Invalid Email Format")
//       .matches(
//         /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,3}$/,
//         "Invalid Email Format"
//       )
//       .required("Email is required"),
//     password: yup
//       .string()
//       .required("Password is required")
//       .min(8, "Password must be at least 8 characters")
//       .matches(
//         /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
//         "Password must contain an uppercase letter, a lowercase letter, a number and a special character"
//       ),
//   });

//   const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
//     try {
//       const res = await api.post("/user/login", values);
//       if (res.status >= 200 && res.status < 300) {
//         setShowPopup(true);
//         localStorage.setItem("UserId", res.data.UserId);
//         localStorage.setItem("token", res.data.token);
//         resetForm();
//         dispatch(login({ id: res.data.UserId }));
        
//         setTimeout(() => {
//           setShowPopup(false);
//           navigate(res.data.role === "admin" ? "/admin" : "/");
//         }, 1500);
//       }
//     } catch (error) {
//       // Error handling for different status codes
//       if (error.response) {
//         if (error.response.status === 400) {
//           toast.error("No user found. Please create an account.");
//           navigate("/registration");
//         } else if (error.response.status === 401) {
//           toast.error("Incorrect password/username.");
//         } else {
//           toast.error("Something went wrong. Please try again later.");
//         }
//       } else {
//         toast.error("Something went wrong. Please try again later.");
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//           <img className="mx-auto h-36 w-auto" src={Logo} alt="Company Logo" />
//           <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//             Sign in to your account
//           </h2>
//         </div>

//         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//           <Formik
//             initialValues={{ email: "", password: "" }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ isSubmitting }) => (
//               <Form className="space-y-6">
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium leading-6 text-gray-900"
//                   >
//                     Email address
//                   </label>
//                   <div className="mt-2">
//                     <Field
//                       id="email"
//                       name="email"
//                       type="text"
//                       placeholder="Enter Email"
//                       autoComplete="email"
//                       className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                     <ErrorMessage
//                       name="email"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <div className="flex items-center justify-between">
//                     <label
//                       htmlFor="password"
//                       className="block text-sm font-medium leading-6 text-gray-900"
//                     >
//                       Password
//                     </label>
//                   </div>
//                   <div className="mt-2">
//                     <Field
//                       id="password"
//                       name="password"
//                       type="password"
//                       placeholder="Enter Password"
//                       autoComplete="current-password"
//                       className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                     <ErrorMessage
//                       name="password"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <button
//                     type="submit"
//                     className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     disabled={isSubmitting}
//                   >
//                     Login in
//                   </button>
//                   <ErrorMessage
//                     name="submit"
//                     component="div"
//                     className="text-red-500 text-sm mt-2"
//                   />
//                 </div>
//               </Form>
//             )}
//           </Formik>

//           {showPopup && (
//             <div className="fixed top-0 left-0 w-full h-full flex text-center items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//               <div className="bg-white p-5 rounded-lg shadow">
//                 <div className="flex justify-center items-center">
//                   <img
//                     src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
//                     width={150}
//                     alt="Done"
//                   />
//                 </div>
//                 <h3 className="text-xl font-semibold text-green-600">Success!</h3>
//                 <p>Login Successfully.</p>
//               </div>
//             </div>
//           )}

//           <p className="mt-10 text-center text-sm text-gray-500">
//             Not an user?{" "}
//             <Link
//               to="/registration"
//               className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
//             >
//               Create a new account
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginPage;

import React, { useContext, useState } from "react";
import Logo from "../../../Assets/Logo white.png";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
// import axios from "axios";
//  import { toast } from 'react-toastify';
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
// import { CartContext } from "../../Componet/Contexts/Contexts";
import { useDispatch } from "react-redux";
import { login } from "../../../../Redux/logSlice/logSlice";
import api from "../../../../utils/axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { login } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid Email Format")
      .matches(
        /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,3}$/,
        "Invalid Email Format"
      )
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain an uppercase letter, a lowercase letter, a number and a special character"
      ),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      const res = await api.post("/user/login", values);
      console.log(res);
      
      // If login is blocked
        if (res.status >= 200 && res.status < 300) {
        setShowPopup(true);
        const { userId, token, role } = res.data;
        console.log(res.data.role);
        
        // Store in localStorage
        localStorage.setItem("id", userId);
        localStorage.setItem("token", token);
        
        resetForm();
        dispatch(login({ id: userId }));
  
        // Navigate based on role
        setTimeout(() => {
          setShowPopup(false);
          if (res.data.userId == "66f6752c3913c2090f844734") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if(status===403){
          toast.error("You are blocked");
          
        }
         else if (status === 400) {
          toast.error("No user found. Please create an account");
          navigate("/registration");
        } else if (status === 401) {
          toast.error("Incorrect password/username");
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Network error or server is not responding");
      }
      
    } 
  };
  

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-36 w-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwEW_CFG2UFcgbOqweXnTGqCgkximYg6Be-Q&s" alt="Company Logo" />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <Field
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Enter Email"
                      autoComplete="email"
                      className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                      autoComplete="current-password"
                      className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={isSubmitting}
                  >
                    Login in
                  </button>
                  <ErrorMessage
                    name="submit"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>
              </Form>
            )}
          </Formik>

          {showPopup && (
            <div className="fixed top-0 left-0 w-full h-full flex text-center items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-5 rounded-lg shadow">
                <div className="flex justify-center items-center">
                  <img
                    src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
                    width={150}
                    alt="Done"
                  />
                </div>
                <h3 className="text-xl font-semibold text-green-600">
                  Success!
                </h3>
                <p>Login Successfully.</p>
              </div>
            </div>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            Not an user?{"  "}
            <Link
              to="/registration"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create a new account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

