import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  quantityDecrementAsync,
  quantityIncrementAsync,
  removeFromCartAsync,
  settingCart,
} from "../../../../Redux/cartSlice/cartSlice";
import api from "../../../../utils/axios";


export default function CartPage() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const { cart } = useSelector((state) => state.cartSlice);
  const { filteredUsers } = useSelector((state) => state.usersSlice);
  const user = filteredUsers?.data?.find((user) => user._id === id);

  useEffect(() => {
    if (id) {
      dispatch(settingCart());
    }
  }, [dispatch, id]);
  const Subtotal = cart?.reduce((total, product) => {
    return total + product.productId.price * product.quantity;
  }, 0);

  const handleCheckout = async () => {
    try {
      const response = await api.post(`/user/payments/${id}`, {
        currency: "INR",
        amount: Subtotal * 100,
      });

      if (response.data.success) {
        const options = {
          key: "rzp_test_wL1B6IUAUSnQqu",
          amount: Subtotal * 100,
          currency: "INR",
          name: "pet-food",
          description: "Test Transaction",
          image: "../../../Assets/logo png 3.png",
          order_id: response.data.data.id,
          handler: async function (response) {
            const verificationResponse = await api.post(
              `/user/paymentvaification/${id}`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }
            );
            if (verificationResponse?.data?.success) {
              dispatch(clearCart());
              toast.success(`You Paid ₹${Subtotal} Successfully`);
              navigate("/products");
            } else {
              toast.error("Payment verification failed");
            }
          },
          prefill: {
            name: user.username,
            email: user.email,
            contact: user.contact,
          },
          notes: {
            address: user.address,
            pincode: user.pincode,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert(`Payment failed: ${response.error.description}`);
        });
        rzp1.open();
      } else {
        toast.error("Failed to create payment order");
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Cart is empty ");
      } else {
        console.error("Payment Creation Failed ", error);
        toast.error("Payment Creation Failed. Please try again.");
      }
    }
  };
  {cart?.map((product) =>{console.log(product.productId);
  })}

  return (
    <>
      {open && (
        <div className=" z-30 bg-gray-300 bg-opacity-75 flex items-end justify-center p-6">
          <div className="bg-white shadow-xl w-full  p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">Shopping cart</h3>
              <Link to="/products">
                <button
                  className="p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </Link>
            </div>

            <ul className="mt-8 divide-y divide-gray-200">
              {cart?.map((product) => (
                
                <li key={product._id} className="py-6 flex">
                  {console.log(product)}
                  
                  <img
                    className="h-32 w-32 rounded-md border"
                    src={product.productId.imageSrc}
                    alt={product.productId.imageAlt}
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">
                      <Link to={product.productId.href}>
                        {product.productId.product_name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500">{product.productId.product_name}</p>
                    <p className="text-xs text-gray-500">
                      {product.productId.price} x {product.quantity}
                    </p>
                    <div className="mt-2 flex justify-between">
                      <div>
                        <button
                          className="px-1 py-0.5 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                          onClick={() => dispatch(quantityDecrementAsync(product))}
                        >
                          -
                        </button>
                        <span className="mx-2">Qty {product.quantity}</span>
                        <button
                          className="px-1 py-0.5 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                          onClick={() => dispatch(quantityIncrementAsync(product))}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="text-indigo-600  hover:text-indigo-500"
                        onClick={() => dispatch(removeFromCartAsync(product.productId._id), toast.success("remove sucessfully")) }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between text-gray-900">
                <p>Total</p>
                <p>₹{Subtotal}</p>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
              >
                Buy Now
              </button>
              <p className="mt-6 text-center text-sm text-gray-500">
                or{" "}
                <Link to="/products" className="text-indigo-600 hover:text-indigo-500">
                  Go to shop &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
