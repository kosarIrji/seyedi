import React, { useState } from "react";
import { House, CirclePlus, User, HeartHandshake } from "lucide-react";

const MobileMenu = () => {
  const [userMenu, setUserMenu] = useState(false);
  const closeUserMenu = () => setUserMenu(false);

  const bottomActions = [
    {
      label: "بازار املاک",
      href: "https://hominex.ir/estates",
      Icon: House,
      className: "",
    },
    {
      label: "آگهی",
      href: "https://hominex.ir/auth",
      Icon: CirclePlus,
      className: "ml-10",
    },
    {
      label: " مشاوره ",
      href: "https://hominex.ir/consultation",
      Icon: HeartHandshake,
      className: "mr-5",
    },
    {
      label: "ورود",
      href: "https://hominex.ir/auth/login",
      Icon: User,
      className: "",
    },
  ];

  return (
    <div className="mx-auto left-0 right-0 z-[1100] fixed bottom-0 lg:hidden text-white grid grid-cols-4 gap-2 py-2 px-5 sm:mt-3 h-auto shadow-lg backdrop-blur-md bg-opacity-95 bg-[#232323]/85 shadow-black/20 border-t border-[#232323]">
      {/* لوگوی وسط */}
      <a
  href="https://hominex.ir"
  className="   absolute -top-3 left-1/2 -translate-x-1/2
        z-30"
>
 <div
  className="
    relative
    h-16 w-16
    rounded-full
    bg-cyan-600
    flex items-center justify-center
    shadow-[0_8px_25px_rgba(0,255,200,0.25)]
    border border-white/20
    backdrop-blur-xl
    transition-all duration-300 ease-out
    hover:scale-110
    hover:shadow-[0_12px_35px_rgba(0,255,200,0.35)]
  "
>

    {/* حلقه‌ی نئونی */}
    <div className="absolute inset-0 rounded-full animate-pulse bg-cyan-400/30 blur-xl"></div>

    {/* لوگو */}
    <div className="relative z-10 w-10 h-10 flex items-center justify-center">
      <img
        src={`${import.meta.env.BASE_URL}logos/logoWhite.png`}
        alt="هومینکس"
        className="object-contain"
      />
    </div>
  </div>
</a>

      {/* آیتم‌های منو */}
      {bottomActions.map(({ label, href, Icon, className }, i) => {
        const iconElement = <Icon className="w-5 h-5 text-gray-300" />;

        return (
          <a
            key={i}
            href={href}
            className={
              "flex flex-col items-center justify-center gap-1 py-1 hover:text-cyan-400 transition-colors " +
              className
            }
            target={href?.startsWith("http") ? "_blank" : "_self"}
            rel={href?.startsWith("http") ? "noopener noreferrer" : ""}
          >
            {iconElement}
            <span className="text-xs text-gray-300 hover:text-cyan-400">
              {label}
            </span>
          </a>
        );
      })}

      {/* منوی کاربر */}
      {userMenu && (
        <div className="absolute bottom-20 left-4 z-50 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-lg text-sm p-3 flex flex-col gap-2 min-w-36 border border-gray-700">
          <a
            href="/dashboard"
            onClick={closeUserMenu}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 transition-colors"
          >
            داشبورد
          </a>

          <button
            onClick={closeUserMenu}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-red-400 transition-colors"
          >
            خروج
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
