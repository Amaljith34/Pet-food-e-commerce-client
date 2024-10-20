// import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import api from "../../../../utils/axios";
import { addProduct } from "../../../../Redux/productSlice/productSlice";

const AdminAddProduct = () => {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    product_name: yup.string().required("This Field is Required"),
    imageSrc: yup.string().url().required("This Field is Required"),
    imageAlt: yup.string().required("This Field is Required"),
    price: yup.number().required("This Field is Required"),
    discription: yup.string().required("This Field is Required"),
    category: yup.string().required("This Field is Required"),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      const response = await api.post("/admin/product", values);
      console.log(response);
    
      
      dispatch(addProduct(response.data.data));
      toast.success(`Added "${values.product_name}" succesfully`);
      resetForm();
      // console.log(values);
    } catch (error) {
      resetForm();
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="drop-shadow-xl text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Add Products
          </h1>

          <Formik
            initialValues={{
              product_name: "",
              imageSrc: "",
              imageAlt: "",
              price: "",
              discription: "",
              category: "",
              quantity: 1,
              isShow:"false"
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="overflow-y-auto sm:h-96 h-full mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 sm:ms-20 ">
                
                <p className="text-center text-lg font-medium">
                  Add products to your cart
                </p>

                <div>
                  <label
                    htmlFor=""
                    className="block ps-1.5 pb-1 text-sm text-start font-medium leading-6 text-gray-400"
                  >
                    Product Title
                  </label>
                  <div className="relative">
                    <Field
                      name="product_name"
                      type="text"
                      className="w-full rounded-md mb-2 border-gray-200 p-3 pe-12 text-sm shadow-sm border"
                      placeholder="Enter product name "
                    />
                    <ErrorMessage
                      component="div"
                      name="product_name"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block ps-1.5 pb-1 text-sm text-start font-medium leading-6 text-gray-400"
                  >
                    ImageSrc
                  </label>
                  <div className="relative">
                    <Field
                      name="imageSrc"
                      type="text"
                      className="w-full rounded-md mb-2 border-gray-200 p-3 pe-12 text-sm shadow-sm border"
                      placeholder="Enter ImageSrc"
                    />
                    <ErrorMessage
                      component="div"
                      name="imageSrc"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block ps-1.5 pb-1 text-sm text-start font-medium leading-6 text-gray-400"
                  >
                    ImageAlt
                  </label>
                  <div className="relative">
                    <Field
                      name="imageAlt"
                      type="text"
                      className="w-full rounded-md mb-2 border-gray-200 p-3 pe-12 text-sm shadow-sm border"
                      placeholder="Enter ImageAlt"
                    />
                    <ErrorMessage
                      component="div"
                      name="imageAlt"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block ps-1.5 pb-1 text-sm text-start font-medium leading-6 text-gray-400"
                  >
                    Price
                  </label>
                  <div className="relative">
                    <Field
                      name="price"
                      type="text"
                      className="w-full rounded-md mb-2 border-gray-200 p-3 pe-12 text-sm shadow-sm border"
                      placeholder="Enter Price"
                    />
                    <ErrorMessage
                      component="div"
                      name="price"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block ps-1.5 pb-1 text-sm text-start font-medium leading-6 text-gray-400"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <Field
                      name="category"
                      type="text"
                      className="w-full rounded-md mb-2 border-gray-200 p-3 pe-12 text-sm shadow-sm border"
                      placeholder="Enter category"
                    />
                    <ErrorMessage
                      component="div"
                      name="category"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block ps-1.5 pb-1 text-sm text-start font-medium leading-6 text-gray-400"
                  >
                    isShow
                  </label>
                  <div className="relative">
                    <Field
                      name="isShow"
                      type="text"
                      className="w-full rounded-md mb-2 border-gray-200 p-3 pe-12 text-sm shadow-sm border"
                      placeholder="Enter isShow"
                    />
                    <ErrorMessage
                      component="div"
                      name="isShow"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <label
                      htmlFor=""
                      className="block ps-1.5 pb-1 text-sm text-start font-medium leading-6 text-gray-400"
                    >
                      Discription
                    </label>
                    <Field
                      name="discription"
                      type="text"
                      className="w-full rounded-md mb-4 border-gray-200 p-3 pe-12 text-sm shadow-sm border"
                      placeholder="Enter discription"
                    />
                    <ErrorMessage
                      component="div"
                      name="discription"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                
                <button
                  
                  type="submit"
                  className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                  disabled={isSubmitting}
                  
                >
                  Add Product
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
