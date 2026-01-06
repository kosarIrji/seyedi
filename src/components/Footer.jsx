import React from "react";
import { Mail, Phone, Pin } from "./icons";

const footerLinks = [
  { title: "بازار املاک", href: "https://hominex.ir/estates" },
  { title: "مشاوره خرید", href: "https://hominex.ir/consultation" },
  { title: "درباره ما", href: "https://hominex.ir/about-us" },
  { title: "قوانین و مقررات", href: "https://hominex.ir/rules" },
];

import logo from "./../../public/logos/logoWhite.png";
import enmad from "./../../public/images/enamad.png";

// حذف React.FC
const ContactUs = () => {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-gray-300 font-semibold mb-3">ارتباط باما</h6>
      <p className="flex gap-2 items-center">
        <Mail /> hominex.co@gmail.com
      </p>

      <p className="flex gap-2 items-center">
        <Phone />
        <span className="flex flex-col gap-1">
          <span>32231035 - 058</span>
          <span>09396792171</span>
        </span>
      </p>

      <p className="flex gap-2 items-center">
        <Pin /> بجنورد - خیابان امیریه شمالی - کوچه رضا امامی 15
      </p>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#232323]/70 text-white backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-5 py-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* لوگو */}
        <div className="flex flex-col gap-4">
          <a href="/" className="flex items-center gap-4">
            <img src={logo} alt="هومینکس" className="w-20 h-20" />
            <div>
              <span className="text-xl font-bold">هومینکس</span>
              <p className="text-sm text-gray-300">ارائه خدمات تخصصی املاک</p>
            </div>
          </a>
        </div>

        {/* لینک‌ها */}
        <div>
          <h6 className="text-gray-300 font-semibold mb-3">خدمات</h6>
          <ul className="flex flex-col gap-2">
            {footerLinks.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="hover:text-blue-400 transition-colors"
                >
                  {item.title}
                </a>
              </li>
            ))}

            <li>
              <a
                href="https://hominow.ir/app/Hominex.apk"
                download
                className="hover:text-blue-400 transition-colors"
              >
                دانلود اپلیکیشن اندروید
              </a>
            </li>
          </ul>
        </div>

        {/* تماس با ما */}
        <ContactUs />

        {/* مجوزها */}
        <div>
          <h6 className="text-text-gray-300 font-semibold mb-3">مجوزها</h6>
          <a
            href="https://trustseal.enamad.ir/?id=578965&Code=RBGUFTHNcR5l3JS6UtEQL9CzV5tLM97p"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={enmad} alt="enamad" className="w-24 h-24" />
          </a>
        </div>
      </div>

      {/* کپی‌رایت */}
      <div className="bg-black/50 text-center py-4 text-sm text-gray-300">
        © {new Date().getFullYear()} توسعه توسط تیم هومینکس
      </div>
    </footer>
  );
};

export default Footer;
