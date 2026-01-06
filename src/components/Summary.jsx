import SummaryChart from "./SummryChart";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { ClipboardCheck } from "lucide-react";
import Details from "../components/config/details.json";

export default function Summary() {
  return (
    <section className="relative my-3 border bg-white/50 backdrop-blur-sm  rounded-2xl shadow-lg  py-3 sm:p-2 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" col-span-2 md:col-span-1  sm:p-2 p-5"
      >
        <h3 className="text-3xl  w-full flex flex-row-reverse items-center text-right justify-end gap-2 font-modam font-extrabold text-[var(--text)] mb-4 leading-snug">
          جمع‌بندی نهایی {Details.alley.name}
          <ClipboardCheck size={28} />
        </h3>

        <p className="md:leading-loose lg:leading-loose font-modam text-justify text-base ">
          محله سیدی بجنورد یک محله با بافت کم تراکم، قدیمی و ارگانیک است که
          کاربری غالب آن مسکونی بوده و در کنار آن فعالیت ‌های تجاری، مذهبی و
          خدماتی نیز به‌صورت پراکنده دیده می‌شود. بیش از نیمی از قطعات با قدمت
          بالا نیازمند نوسازی و بهسازی کالبدی هستند. دسترسی به خیابان ‌های اصلی
          مطلوب است اما معابر داخلی کم ‌عرض بوده و کیفیت مناسبی ندارند. خدمات
          آموزشی و مذهبی نسبتا فعال ‌اند ولی کمبود فضای سبز، مسیر پیاده‌ روی و
          مبلمان شهری، سطح کیفیت زندگی را در حد متوسط نگه داشته است. ظرفیت
          مناسبی برای سرمایه‌گذاری در نوسازی، ساخت ‌و ساز و استفاده از زمین ‌های
          بایر وجود دارد، مشروط به تدوین سیاست ‌های حمایتی از سوی مدیریت شهری.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="col-span-2 md:col-span-1"
      >
        <SummaryChart />
      </motion.div>
    </section>
  );
}
