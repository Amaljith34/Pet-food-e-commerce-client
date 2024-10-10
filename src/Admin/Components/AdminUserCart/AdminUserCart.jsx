import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminUserCart() {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const idNum = id.slice(1);
  const user = users.find((item) => item._id === idNum);
  const [open, setOpen] = useState(true);

  const { cart } = useSelector((state) => state.cartSlice);

  const Subtotal = cart?.reduce((total, product) => {
    return total + product.productId.price * product.quantity;
  }, 0);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-500 bg-opacity-75">
          <div className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-2xl">
            <button
              type="button"
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <Link to="/admin/userslist">
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </Link>
            </button>
            <div className="overflow-x-auto">
              {cart.length > 0 ? (
                <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="px-4 py-2 font-medium text-gray-900">Product Title</th>
                      <th className="px-4 py-2 font-medium text-gray-900">Product Discription</th>
                      <th className="px-4 py-2 font-medium text-gray-900">Product Quantity</th>
                      <th className="px-4 py-2 font-medium text-gray-900">Product Price</th>
                      <th className="px-4 py-2 font-medium text-gray-900">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cart.map((product) => (
                      <tr key={product._id} className="odd:bg-gray-50">
                        <td className="px-4 py-2 font-medium text-gray-900">{product.productId.product_name}</td>
                        <td className="px-4 py-2 text-gray-700">{product.productId.discription}</td>
                        <td className="px-4 py-2 text-gray-700">{product.quantity}</td>
                        <td className="px-4 py-2 text-gray-700">{product.productId.price}</td>
                        <td className="px-4 py-2 text-gray-700">
                          {product.productId.price * product.quantity}
                        </td>
                      </tr>
                    ))}
                    <tr className="odd:bg-gray-50">
                      <td className="px-4 py-2 font-medium text-gray-900"></td>
                      <td className="px-4 py-2 text-gray-700"></td>
                      <td className="px-4 py-2 text-gray-700"></td>
                      <th className="px-4 py-2 text-gray-700">Subtotal</th>
                      <th className="px-4 py-2 text-gray-700 border">₹{Subtotal.toFixed(2)}</th>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p className="text-center font-bold">No Cart Found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
