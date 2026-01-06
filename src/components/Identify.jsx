/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Details from "../components/config/details.json";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';







const windowHeight = window.innerWidth;


const StarRating = ({ rating, totalStars = 5, size = 24, color = '#FFD700' }) => {
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} size={size} color={color} />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} size={size} color={color} />);
    } else {
      stars.push(<FaRegStar key={i} size={size} color={color} />);
    }
  }

  return <div style={{ display: 'flex', gap: '4px' }}>{stars}</div>;
};
function Identify() {

  return (
    <motion.section
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className=""
      >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-[19px] text-center mb-3">
        <div
          className=" bg-white/50 backdrop-blur-md
border           rounded-2xl shadow-md shadow-[rgba(0,0,0,0.05)] shadow-lg:shadow-[rgba(0,0,0,0.08)]
 p-2 lg:p-4  w-full col-span-2 md:col-span-1 break-words"
        >
          <p className="   text-[var(--text)] ">نام محله:</p>
          <h2 className="font-semibold text-[var(--color-dark-slate)] text-lg  truncate">
            {Details.alley.name}
          
          </h2>
        </div>



        <div
          className=" bg-white/50 backdrop-blur-md
border           rounded-2xl shadow-md  shadow-[rgba(0,0,0,0.05)] shadow-lg:shadow-[rgba(0,0,0,0.08)]
 p-2 lg:p-4  w-full col-span-1 break-words"
        >
          <p className=" text-xs  text-[var(--text)]">جمعیت محله:</p>
          <h2 className="font-semibold text-[var(--color-dark-slate)] text-lg ">
            {Details.alley.population} نفر
          </h2>
        </div>

        <div
          className=" bg-white/50 backdrop-blur-md
border           rounded-2xl shadow-md  shadow-[rgba(0,0,0,0.05)] shadow-lg:shadow-[rgba(0,0,0,0.08)]
 p-2 lg:p-4  w-full col-span-1 break-words"
        >
          <p className="   text-[var(--text)]">امتیاز محله:</p>
          <h2 className="font-semibold text-[var(--sidebar] text-center text-lg grid grid-cols ">
           {/* <span className="">
            {{Details.alley.rate} }
            </span>  */}
           <span className="mt-1 mx-auto text-[14px] flex gap-2 text-[var(--sidebar)]">
             <StarRating rating={3.5} color="var(--sidebar)" size={20}/>
            </span>
          </h2>
        </div>
        <div
          className="  bg-white/50 backdrop-blur-md
border           rounded-2xl shadow-md  shadow-[rgba(0,0,0,0.05)] shadow-lg:shadow-[rgba(0,0,0,0.08)]
 p-2 lg:p-4   w-full col-span-1 break-words"
        >
          <p className="   text-[var(--text)]">مساحت محله:</p>
          <h2 className="font-semibold text-[var(--color-dark-slate)] text-lg ">
            {Details.alley.area} هکتار
          </h2>
        </div>
        <div
          className=" bg-white/50 backdrop-blur-md
border           rounded-2xl shadow-md  shadow-[rgba(0,0,0,0.05)] shadow-lg:shadow-[rgba(0,0,0,0.08)]
 p-2 lg:p-4  w-full col-span-1 break-words"
        >
          <p className="   text-[var(--text)]">آخرین به روزرسانی:</p>
          <h2 className="font-semibold text-[var(--color-dark-slate)] text-lg ">
            {Details.alley.code}
          </h2>
        </div>
      </div>
    </motion.section>
  );
}

export default Identify;
