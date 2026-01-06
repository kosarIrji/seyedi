/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Details from "../components/config/details.json";
import { LocateIcon } from "lucide-react";

const windowHeight = window.innerWidth;

function Location() {
  const imageAlt = `محله ${Details.alley.name} در سال ۲۰۲۵`;
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className=""
    >
      <motion.img
        src={
          windowHeight < 500
            ? "./images/location-sm.png"
            : "./images/location.png"
        }
        loading="lazy"
        alt="محله  سیدی در سال ۲۰۲۵"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-xl w-[100%] h-[100%] mx-auto object-cover shadow-md   "
      />

      {windowHeight < 500 ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl shadow-sm p-5 mt-2 border lg:col-span-3 bg-white/50 backdrop-blur-md"
        >
          <h3 className="text-3xl    w-full flex flex-row-reverse aling-centeritems-center text-right justify-end gap-2  font-modam font-extrabold   text-[var(--text)] mb-4 leading-snug">
            موقعیت {Details.alley.name}{" "}
            <span>
              <LocateIcon size={28} />
            </span>
          </h3>
          <p className="md:leading-loose lg:leading-loose font-modam  text-justify text-base  ">
            محله سیدی در جنوب شرقی محدوده مرکزی شهر واقع شده که از موقعیت مکانی
            مناسبی برخوردار است. این محله از شمال با خیابان امام خمینی، از غرب
            با خیابان هفده شهریور و از شرق و جنوب با بلوار مدرس محدود می شود که
            دسترسی به شریان های اصلی شهری تسهیل کرده و امکان ارتباط سریع با سایر
            نقاط شهر و حومه را فراهم می سازد.
          </p>
        </motion.div>
      ) : (
        ""
      )}
    </motion.section>
  );
}
export default Location;
