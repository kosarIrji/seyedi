import FunctionalPieChart from "./FunctionalPieChart";
import MapFunctionalAnalysis from "./MapFunctionalAnalysis";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Layers } from "lucide-react";


import Accordion from "./Accordion";

export default function FunctionalAnalysis() {
  return (
    <motion.div
      className="grid w-full lg:grid-cols-5 mt-3 lg:mb-5 gap-3"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* ستون 1: متن و نمودار */}
      <div className="lg:col-span-3 col-span-3  border bg-white/40 backdrop-blur-md  rounded-2xl shadow-sm p-5   text-xl w-full">
        <h3 className="text-3xl sm:text-2xl   w-full flex flex-row-reverse aling-centeritems-center text-right justify-end gap-2  font-modam font-extrabold   text-[var(--text)] mb-4 leading-snug ">
          تحلیل عملکرد شهری در محله سیدی
          <span>
            <Layers size={28} />
          </span>
        </h3>
        <p className="md:leading-loose  whitespace-pre-line lg:leading-loose font-modam  text-justify text-base  ">
          در محله سیدی بخش عمده ای از قطعات، دارای<strong className="text-yellow-800"> کاربری مسکونی</strong> هستند، که نقش
          اصلی محله را به عنوان یک ناحیه سکونتی مشخص می کند. در کنارآن، حضور
          کاربری ‌های آموزشی، مذهبی، اداری، ورزشی به این محله چهره ‌ای پویا و
          متنوع بخشیده است. <br />
          در کنار آن قطعاتی با کاربری های تجاری و مختلط (مسکونی- تجاری) حضور
          دارند، پراکندگی این فعالیت ها به صورت ناحیه ای شکل گرفته است ، که به
          شرح زیر است:
        </p>
        <Accordion
          title={
            <span
              className="text-base font-bold bg-text-right text-red-800"
              style={{ fontFamily: "Modam" }}
            >
              {" "}
              خیابان امام خمینی شرقی و خیابان سیدی :
            </span>
          }
          content={
            <ul>
              <li>
                • ویژگی ها ⬅ افزایش سرزندگی اجتماعی، چهره فعال و پر رفت و آمد،
                تخصصی شدن فضای شهری، جذب مراجعین از سایر نقاط.
              </li>
              <li>•کاربری غالب ⬅نمایشگاه اتومبیل، خدمات محلی.</li>
            </ul>
          }
          defaultOpen={false}
        />{" "}
        <Accordion
          title={
            <span
              className="text-base font-bold bg-text-right text-blue-800"
              style={{ fontFamily: "Modam" }}
            >
              {" "}
              خیابان آزادی:
            </span>
          }
          content={
            <ul>
              <li>
                • ویژگی ها ⬅ دسترسی پذیری بالا برای ساکنین، حضور خدمات آموزشی و
                اداری.
              </li>
              <li>•کاربری غالب ⬅مسکونی، تجاری، اداری.</li>
            </ul>
          }
          defaultOpen={false}
        />
        <Accordion
          title={
            <span
              className="text-base font-bold bg-text-right text-purple-800"
              style={{ fontFamily: "Modam" }}
            >
              {" "}
              کنارگذر مدرس:
            </span>
          }
          content={
            <ul>
              <li>
                • ویژگی ها ⬅همجواری با کمربندی شهر، مزاحمت نسبی برای کاربری
                مسکونی.
              </li>
              <li>•کاربری غالب ⬅تعمیرگاه و قطعات یدکی.</li>
            </ul>
          }
          defaultOpen={false}
        />
        <Accordion
          title={
            <strong
              className="text-base font-bold bg-text-right text-amber-800"
              style={{ fontFamily: "Modam" }}
            >
              {" "}
              خیابان هفده شهریور جنوبی:
            </strong>
          }
          content={
            <ul>
              <li>
                • ویژگی ها ⬅تمرکز فعالیت های ساختمانی، دسترسی سریع به محور های
                شهری.
              </li>
              <li>•کاربری غالب ⬅.مصالح ساختمانی و نیمه صنعتی.</li>
            </ul>
          }
          defaultOpen={false}
        />
      </div>
      <div className="col-span-3 lg:col-span-2 border bg-white/40 backdrop-blur-md  rounded-2xl shadow-sm pl-5 pr-5 pt-5   text-xl w-full">
        <FunctionalPieChart />
      </div>

      {/* ستون 2 و 3: نقشه */}
      <motion.div
        className="col-span-3 shadow-md lg:col-span-5 rounded-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <MapFunctionalAnalysis />
      </motion.div>
    </motion.div>
  );
}
