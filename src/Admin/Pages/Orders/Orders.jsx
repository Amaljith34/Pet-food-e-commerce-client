// src/components/Orders/Orders.js

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SearchBar from "../../../G-Components/SearchBar/SearchBar";
import { fetchallOrders } from "../../../../Redux/ordersSlice/AllOrderslice";

export default function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchallOrders()); // Fetch all orders on component mount
  }, [dispatch]);

  return (
    <>
     
      <div className=" overflow-x-auto">
        <h1 className="font-bold text-center">Orders</h1>
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm mt-10">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className=" left-0 bg-white whitespace-nowrap px-4 py-2 font-medium text-gray-900">Order ID</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Customer Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Total Amount</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">View Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center tracking-wider">
            {loading && <tr><td colSpan="5">Loading..</td></tr>}
            {error && <tr><td colSpan="5">{error}</td></tr>}
            {orders?.map((order) => (
              <tr key={order.order_Id}>{console.log(order)}
              
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{order._id}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{order.Customer_Name}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{order.Total_Amount}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <button
                    // onClick={() => navigate(`/admin/orders/${order.order_Id}`)}
                    type="button"
                    className="px-2.5 py-1 rounded-md bg-lime-600 text-white font-semibold text-base shadow hover:bg-lime-700 focus:outline-none focus:ring-lime-700"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
