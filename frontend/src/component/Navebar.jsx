import React, { useContext, useState } from "react";
import { assets } from "./../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navebar = () => {
  const [visable, setVisable] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const logout = () => {
    navigate("/login");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img className="w-36" src={assets.logo} alt="" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {["/", "/collection", "/about", "/contact"].map((path, index) => {
          const labels = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
          return (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${
                  isActive ? "text-black font-semibold" : "text-gray-700"
                }`
              }
            >
              <p>{labels[index]}</p>
              <hr
                className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${
                  window.location.pathname === path ? "block" : "hidden"
                }`}
              />
            </NavLink>
          );
        })}
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          className="w-5 h-5 cursor-pointer"
          src={assets.search_icon}
          alt=""
        />
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 h-6 cursor-pointer"
            src={assets.profile_icon}
            alt=""
          />
          {/*----------------------------DroupDown---------------------------- */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/order")}
                  className="cursor-pointer hover:text-black"
                >
                  Order
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Log Out
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img
            className="w-5 h-5 cursor-pointer"
            src={assets.cart_icon}
            alt=""
          />
          <p className="absolute bottom-[-3px] right-[-4px] bg-black text-white aspect-square w-4 rounded-full text-center leading-4 text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisable(true)}
          className="w-5 h-5 cursor-pointer sm:hidden"
          src={assets.menu_icon}
          alt=""
        />
      </div>
      {/* --------------------Side Bar Menu for Small Screen-------------------- */}
      <div
        className={`absolute top-0 bottom-0 overflow-hidden bg-white transition-all ${visable ? "w-full" : "w-0"}`}>
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisable(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisable(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisable(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisable(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisable(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navebar;
