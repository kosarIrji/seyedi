"use client";
import { useState } from "react";
import {User }from "./icons"
import { routes } from "./config/routes";


type routeItem = {
  title: string;
  route: string;
};

const Header = () => {
  const [menu, setMenu] = useState(false);

  

  

  return (
    <>
      {/* ================= HEADER (TOP) ================= */}
      <div className="z-[1100] fixed top-0 left-4 right-4 hidden   md:right-[240px] sm:top-5 text-white lg:flex justify-between items-center py-4 pr-4 sm:pl-9 px-5 sm:mt-3 sm:rounded-2xl mx-auto shadow-lg backdrop-blur-md bg-opacity-60 bg-[#232323]/60 backdrop:blur-3xl bg-opacity-40 shadow-black/20">
        {/* logo */}
        <div className="flex gap-2 items-center">
          <a href={"https://hominex.ir//"}>
            <img
              className="cursor-pointer"
              src={"./logos/logoMain.png"}
              alt="logo"
              width={60}
              height={60}
            />
          </a>
          <div className="lg:flex flex-col hidden ">
            <span className="font-bold text-xl">هومینکس</span>
          </div>
        </div>

        {/* menu */}
        <div className="hidden lg:flex">
          <ul className="flex gap-7 mr-[-90px] sm:mr-0 justify-center [&>li]:cursor-pointer [&>li]:relative">
            {routes.map((item: routeItem, i: number) => (
              <li key={i} className="relative group flex flex-col items-center">
                <a
                  href={item.route}
                  className="relative z-10 transition-colors duration-300 group-hover:text-white/70"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <a href="https://hominex.ir/auth/login" className="sm:block">
          <div
            
            className="cursor-pointer transition-all hover:bg-white sm:p-3 rounded-sm hover:text-black flex gap-2"
            aria-label="ورود / احراز هویت">
            <span>ورود / ثبت نام</span>
          <User/>
          </div>
        </a>
      </div>

     
    </>
  );
};

export default Header;
