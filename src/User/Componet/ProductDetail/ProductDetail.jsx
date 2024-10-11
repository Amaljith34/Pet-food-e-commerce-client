import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../../../../Redux/cartSlice/cartSlice";
import toast, { Toaster } from "react-hot-toast";



export default function ProductDetail() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productSlice);
  const { id } = useParams();
  const idNum = id.slice();

  const product = products?.data?.find((item) => item._id === idNum);

  const [open, setOpen] = useState(true);
  
  const [newQuantity, setNewQuantity] = useState(product?.quantity || 1);

  const handleChange = (change) => {
    const updatedQuantity = newQuantity + change;
    if (updatedQuantity > 0) {
      setNewQuantity(updatedQuantity);
    }
  };

  const handleCart = () => {
    const productToAdd = { ...product, quantity: newQuantity };
    dispatch(addToCartAsync(productToAdd));
    toast.success("Product added Successfully");
  };
console.log(product.product_name);

  return (
    <div className={`relative z-30 ${open ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <div className="relative flex  items-center bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-lg">
            <button
              type="button"
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close</span>
              <Link to="/products">
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </Link>
            </button>

            <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
              <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                <img
                  src={product?.imageSrc}
                  alt={product?.imageAlt}
                  className="object-cover object-center"
                />
              </div>
              <div className="sm:col-span-8 lg:col-span-7">
                <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                  {product.product_name}
                </h2>
                <p className="text-xl text-gray-900 mt-14">Price: ₹{product?.price}</p>
               
                <p className="text-xl text-gray-900 mt-6">Category: ₹{product?.category}</p>

                <form>            
                  <div className="mt-4">
                    
                    
                  </div>

                  <p className="text-gray-500 pt-10">
                    <button
                      type="button"
                      onClick={() => handleChange(-1)}
                      className="px-1 py-0.5 bg-indigo-500 text-white font-semibold text-base rounded shadow hover:bg-indigo-600 focus:outline-none"
                    >
                      -
                    </button>{" "}
                    Qty {newQuantity}{" "}
                    <button
                      type="button"
                      onClick={() => handleChange(1)}
                      className="px-1 py-0.5 bg-indigo-500 text-white font-semibold text-base rounded shadow hover:bg-indigo-600 focus:outline-none"
                    >
                      +
                    </button>
                  </p>

                  <Link to={"/products"}>
                    <button
                      onClick={handleCart}
                      type="button"
                      className="mt-24 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to Cart
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
