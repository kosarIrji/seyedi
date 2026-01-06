import React from "react";
import { TrendingUp } from "lucide-react";
import Details from "../components/config/details.json";
import { FaMoneyBillWave } from "react-icons/fa";
export default function Priorities() {
  return (
    // main component
    <div className="flex flex-col overflow-hidden w-full items-center justify-center pt-3 my-3 border bg-white/50 backdrop-blur-md shadow-md p-4 py-5 rounded-2xl">
      <h3 className="text-3xl sm:text-2xl   w-full flex flex-row-reverse aling-centeritems-center text-right justify-end gap-2 mt-2 font-modam font-extrabold   text-[var(--text)] mb-4 leading-snug ">
        اولویت های سرمایه گذاری محله {Details.alley.name}
        <TrendingUp size={28} />
      </h3>
      {/* itmes container */}
      <div className="w-full   flex flex-col lg:flex-row gap-[10px] justify-evenly xl:justify-center items-center">
        {/* Box 1 */}
        <div className="rounded-xl shadow p-4 flex flex-col items-center justify-between w-full max-w-xs md:h-[210px] lg:h-[240px] h-[160px] bg-gradient-to-t  from-green-100  to-green-200 ">
          <h2 className="text-lg font-bold  text-gray-800">
            {Details.priorities[0].title}:
          </h2>
          <p className="text-gray-900 text-center md:mt-5  text-base">
            {Details.priorities[0].context}
          </p>
        </div>
        {/* Box 2 */}
        <div className="rounded-xl shadow p-4 flex flex-col  items-center justify-between w-full max-w-xs md:h-[210px] lg:h-[240px] h-[160px] bg-gradient-to-t  from-green-800  to-green-900">
          <h2 className="text-lg font-bold  text-white">
            {" "}
            {Details.priorities[1].title}:
          </h2>
          <p className="text-white text-center md:mt-5  text-base">
            {Details.priorities[1].context}
          </p>
        </div>
        {/* Box 3 */}
        <div className="rounded-xl shadow p-4 flex flex-col items-center justify-between w-full max-w-xs md:h-[210px] lg:h-[240px] h-[160px] bg-gradient-to-t from-green-50 to-green-300">
          <h2 className="text-lg font-bold  text-gray-900">
          {Details.priorities[2].title}
          </h2>
          <p className="text-gray-800 text-center md:mt-5  text-base">
          {Details.priorities[2].context}
          </p>
        </div>
      
      </div>
       <div className=" bg-white/40 mt-2 w-full flex border-r-4 border-green-800 shadow-md mb-1 pt-1 p-2 "> <p className="text-gray-800   text-center  text-base">
         
         <strong className="text-green-900 w-full flex gap-2">
         <FaMoneyBillWave size={20} />
            ریسک سرمایه‌گذاری :</strong><span>
            ریسک کلی در محله سیدی متوسط است و پروژه‌ های مرحله ‌ای و مشارکتی کم‌ ریسک ‌ترین گزینه‌ ها محسوب می‌شوند. {" "}</span>
     </p></div>
    </div>
  );
}
