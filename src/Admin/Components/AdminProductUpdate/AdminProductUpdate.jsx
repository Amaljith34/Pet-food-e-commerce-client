import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProduct } from "../../../../Redux/productSlice/productSlice";
import api from "../../../../utils/axios";

export default function AdminProductUpdate() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productSlice);
  const { id } = useParams();
  const idNum = id.slice(1);
  const product = products?.data?.find((item) => item._id === idNum);
  const navigate = useNavigate();


  const validationSchema = yup.object({
    product_name: yup.string().required("This Field is Required"),
    imageSrc: yup.string().url().required("This Field is Required"),
    imageAlt: yup.string().required("This Field is Required"),
    price: yup.number().required("This Field is Required"),
    discription: yup.string().required("This Field is Required"),
    category: yup.string().required("This Field is Required"),
    isShow:yup.string().required("This Field is Required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const updated = Object.keys(values).some((key) => values[key] !== product[key]);

      if (updated) {
        await api.patch(`/admin/product/${product._id}`, values);
        dispatch(updateProduct(values));
        dispatch(fetchProducts());
        toast.success(`Updated product successfully`);
      } else {
        toast("No changes applied", { icon: "ℹ️" });
      }
      navigate("/admin/productPage");
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-4xl mx-auto">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate("/admin/productPage")}
          className="text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentdiscription"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <h1 className="text-2xl font-bold text-indigo-600 text-center mb-6">Update Product</h1>

      <Formik
        initialValues={{
          product_name: product.product_name || "",
          imageSrc: product.imageSrc || "",
          imageAlt: product.imageAlt || "",
          price: product.price || "",
          discription: product.discription || "",
          category: product.category || "",
          isShow:product.isShow|| "false"
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="product_name" className="block text-sm font-medium text-gray-700">
                Product product_name
              </label>
              <Field name="product_name" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              <ErrorMessage name="product_name" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="imageSrc" className="block text-sm font-medium text-gray-700">
                ImageSrc
              </label>
              <Field name="imageSrc" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              <ErrorMessage name="imageSrc" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700">
                ImageAlt 
              </label>
              <Field name="imageAlt" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              <ErrorMessage name="imageAlt" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <Field name="price" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="discription" className="block text-sm font-medium text-gray-700">
                Discription
              </label>
              <Field name="discription" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              <ErrorMessage name="discription" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <Field name="category" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="isShow" className="block text-sm font-medium text-gray-700">
                isShow
              </label>
              <Field name="isShow" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              <ErrorMessage name="isShow" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm"
              disabled={isSubmitting}
            >
              Update Product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
