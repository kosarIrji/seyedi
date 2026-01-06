import MapAnalysis from "./MapAnalysis";

import FloorChartSelector from "./FloorChartSelector";
import GhedmatChartSelector from "./GhedmatChartSelector";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Button } from "./Button";
import { useState } from "react";
import { FaCity } from "react-icons/fa";
import { Landmark } from "lucide-react";

function PhysicalAnalysis() {
  const [selectedComponent, setSelectedComponent] = useState("ghemat");
  const [chartType, setChartType] = useState("bar");
  return (
    <section className="w-full  ">
      <motion.div
        className=" "
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="col-span-1 grid-cols-2 lg:grid lg:gap-4 md:grid-cols-6 h-full ">
          <div className="border md:col-span-4 bg-white/50 backdrop-blur-md rounded-2xl shadow-lg pb-6 sm:px-4 md:px-4 p-5 mt-3 ">
            <h3 className="text-3xl  w-full flex flex-row-reverse items-center text-right justify-end gap-2 font-modam font-extrabold text-[var(--text)] mb-4 leading-snug">
              بررسی ساختار کالبدی محله سیدی، تحلیلی بر روند فرسودگی و نوسازی
              <span className="">
                {" "}
                <FaCity size={28} />
              </span>
            </h3>
            <div className=" md:leading-loose  whitespace-pre-line lg:leading-loose   text-justify text-base ">
              <p className="font-modam text-base lg:leading-loose text-gray-800 ">
                محله سیدی با غلبه ساختمان‌ های یک و دو طبقه، بافتی کم‌ارتفاع و
                کم‌تراکم دارد؛ بیش از ۷۰٪ قطعات دو طبقه ‌اند و ساخت ‌و ساز های
                بلند مرتبه تنها در چند قطعه دیده می‌شود. نمای غالب ساختمان ‌ها
                سنگی است که از نوسازی ‌های محدود حکایت دارد، هرچند ساختمان ‌های
                بدون نما همچنان در بافت به چشم می‌خورند. نوع مالکیت عمدتاً خصوصی
                است و این موضوع به حفظ هویت محله کمک کرده است.
              </p>
            </div>
            {/* باکس ۲: واقعیت آماری */}
            <div className="bg-white/40 border-r-4 border-[var(--sidebar)] shadow-md mb-2 mt-2 p-2">
              <p className="font-modam text-base md:leading-loose lg:leading-loose text-gray-800   ">
                <span className="font-bold flex gap-1 text-base text-[var(--sidebar)]">
                  <Landmark size={22} className="text-[var(--sidebar)]" />
                  تحلیل آماری قدمت بنا ها و ضرورت تحول کالبدی محله سیدی
                </span>
                <ul>
                  <li>
                    1. ۴۲۲ قطعه با قدمت ۳۰ تا ۵۰ سال: نشان ‌دهنده بافتی نسبتاً
                    قدیمی با احتمال فرسودگی بالا.
                  </li>
                  <li>
                    2. ۳۷۴ قطعه با قدمت ۱۵ تا ۳۰ سال: در آستانه نیاز به نوسازی
                    یا بهسازی قرار دارند.
                  </li>
                  <li>
                    3. ۱۲۵ قطعه با قدمت ۱ تا ۵ سال و ۳۵ قطعه در حال ساخت: بیانگر
                    تحرک محدود نوسازی در بافت ‌اند.
                  </li>
                  <li>
                    4. ۳۱ قطعه بایر: دارای پتانسیل مناسب برای توسعه یا تأمین
                    خدمات جدید هستند.
                  </li>

                  <li>
                    5. ۲۷ قطعه با قدمت بالای ۵۰ سال: در معرض فرسودگی شدید و
                    نیازمند مداخله فوری‌ اند.
                  </li>
                </ul>
                در مجموع، میانگین قدمت قطعات محله سیدی حدود ۲۴ سال است؛ اما در
                کنار آن، وجود ۲۷ قطعه با قدمت بالای ۵۰ سال و ۴۲۲ قطعه در بازه ۳۰
                تا ۵۰ سال، نشان ‌دهنده آن است که محله وارد دوره‌ ای از فرسودگی
                تدریجی شده و نیازمند مداخلات جدی در قالب نوسازی، بهسازی کالبدی و
                بازآفرینی شهری است. این ترکیب آماری لزوم برنامه ‌ریزی منسجم،
                بهره ‌گیری از ظرفیت مشارکت مردمی و تقویت مشوق ‌های نوسازی را
                پررنگ‌تر می‌کند.
                <br />
              </p>
            </div>
          </div>

          <motion.div
            className="flex- flex-col gap-3 border md:col-span-2   bg-white/50 backdrop-blur-md rounded-2xl shadow-lg mt-3  sm:px-4 md:px-4 "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* دکمه‌ها و سلکت نوع نمودار */}
            <div className="flex flex-row justify-between gap-2 lg:max-w-[660px] mx-auto  px-4 sm:px-6 md:px-10 mt-5">
              {/* دکمه‌ها - در یک طرف */}
              <div className="flex gap-1 w-full ">
                {[
                  { label: "قدمت", value: "ghemat" },
                  { label: "طبقات", value: "tabaghat" },
                ].map((btn) => (
                  <Button
                    key={btn.value}
                    onClick={() => setSelectedComponent(btn.value)}
                    variant={
                      selectedComponent === btn.value ? "default" : "outline"
                    }
                    className="w-30 text-sm sm:text-base"
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>

              {/* سلکت - در سمت دیگر */}
              <div className="w-full grid  justify-end">
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  className=" h-10 px-1 py-1 rounded-xl   self-end text-base font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-soft)] transition"
                >
                  <option value="bar">نمودار میله‌ای</option>
                  <option value="line">نمودار خطی</option>
                  <option value="pie">نمودار دایره‌ای</option>
                </select>
              </div>
            </div>

            {/* نمایش نمودار انتخاب‌شده */}
            <div className="w-full lg:max-w-[600px] mx-auto mt-8">
              {selectedComponent === "tabaghat" && (
                <FloorChartSelector chartType={chartType} />
              )}

              {selectedComponent === "ghemat" && (
                <GhedmatChartSelector chartType={chartType} />
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="col-span-1 md:col-span-2 shadow-md mt-3"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <MapAnalysis />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default PhysicalAnalysis;
