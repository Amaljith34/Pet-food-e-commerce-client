import React, { useState } from "react";
import logo from "../../../Assets/Logo.png";
import fontLogo from "../../../Assets/font.png";
import { Link } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../Redux/logSlice/logSlice";

export const AdminNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLogged } = useSelector((state) => state.isLogged);

  return (
    <>
      <header className="fixed w-full z-10 bg-white shadow">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 sm:px-8" aria-label="Global">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-12 me-5" />
            <img src={fontLogo} alt="Font Logo" className="hidden md:block w-32" />
          </div>
          <div className="hidden md:flex space-x-9">
          <Link to="/admin" className="text-sm font-semibold leading-6 text-gray-900">
              Dashbord
            </Link>
            <Link to="/admin/productPage" className="text-sm font-semibold leading-6 text-gray-900">
              Products
            </Link>
            <Link to="/admin/addproduct" className="text-sm font-semibold leading-6 text-gray-900">
              Add Products
            </Link>
            <Link to="/admin/userslist" className="text-sm font-semibold leading-6 text-gray-900">
              Users List
            </Link>
            
            <Link
              onClick={() => {
                logout();
                localStorage.clear();
              }}
              to="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {isLogged ? "Log out" : "Log in"}
            </Link>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <img className="h-12 w-auto" src={fontLogo} alt="Company Logo" />
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link onClick={() => setMobileMenuOpen(false)} to="/admin/productPage" className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    Products
                  </Link>
                  <Link onClick={() => setMobileMenuOpen(false)} to="/admin/addproduct" className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    Add Products
                  </Link>
                  <Link onClick={() => setMobileMenuOpen(false)} to="/admin/userslist" className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    Users List
                  </Link>
                  <Link onClick={() => setMobileMenuOpen(false)} to="/" className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    Go to Home
                  </Link>
                  <Link
                    onClick={() => {
                      logout();
                      localStorage.clear();
                    }}
                    to="/login"
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {isLogged ? "Log out" : "Log in"}
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main className="pt-28">
        <Outlet />
      </main>
    </>
  );
};
