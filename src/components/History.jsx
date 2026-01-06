/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  ArrowBigDownIcon,
  ArrowBigLeftIcon,
  XIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "lucide-react";
import Details from "../components/config/details.json";

function History() {
  const images = [
    { year: "1335", src: "./images/1930.jpg" },
    { year: "1404", src: "./images/2025.jpg" },
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openModal = (index) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);
  const showPrev = () =>
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const showNext = () =>
    setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  return (
    <>
      <section className="mt-3 border bg-white/50 backdrop-blur-md rounded-2xl shadow-md p-6 grid lg:grid-cols-4 gap-5">
        {/* عنوان و توضیحات */}
        <div className="lg:col-span-2">
          <h3 className="text-3xl  w-full flex flex-row-reverse items-center text-right justify-end gap-2 font-modam font-extrabold text-[var(--text)] mb-4 leading-snug">
            تاریخچه و گذر زمان در {Details.alley.name}
            <BookOpenIcon size={28} />
          </h3>

          <p className="md:leading-loose lg:leading-loose font-modam text-justify text-base ">
            محله سیدی در دهه ‌های <strong> ۱۳۴۰ و ۱۳۵۰ </strong>{" "}
            <strong className="text-green-800">عمدتاً کاربری کشاورزی</strong>{" "}
            داشته و بافت آن شامل زمین ‌های زراعی و فضا های باز بوده است. روند
            توسعه سکونتی این محله از دهه ۱۳۶۰، هم زمان با گسترش شهر و افزایش
            تقاضا برای سکونت در حاشیه، آغاز شد. نام محله برگرفته از خیابان{" "}
            <strong>« سیدی» </strong>است. همچنین، این محدوده در گذشته با عنوان{" "}
            <strong>« منبع آب»
     </strong> نیز شناخته می‌شده؛ نامی که از سازه‌ شاخص و قدیمی
            منبع آب در محله گرفته شده و یکی از عناصر هویتی مهم آن به
            شمار می ‌رود.
          </p>
        </div>

        {/* تصاویر و فلش بین‌شان */}
        <div className="grid grid-cols-2 w-full gap-5  lg:mt-7 lg:col-span-2 relative">
          {/* تصویر اول */}
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.6, delay: 0 }}
            onClick={() => openModal(0)}
          >
            <img
              src={images[0].src}
              loading="lazy"
              alt={`محله سیدی در سال ${images[0].year}`}
              className="rounded-xl    shadow-md w-[250px] h-[170px] lg:max-w-[250px] object-cover"
            />
            <p className="text-center mt-3 text-orange-900 text-base leading-relaxed">
              محله سیدی - سال {images[0].year}
            </p>
          </motion.div>

          {/* فلش بین تصاویر
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <ArrowBigLeftIcon
              size={44}
              className="hidden  lg:block text-orange-900 animate-bounce-left"
            />
            <ArrowBigDownIcon
              size={44}
              className="block  lg:hidden text-orange-900  mb-10 animate-bounce-down"
            />
          </motion.div> */}

          {/* تصویر دوم */}
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.6, delay: 0.03 }}
            onClick={() => openModal(1)}
          >
            <img
              src={images[1].src}
              loading="lazy"
              alt={`محله سیدی در سال ${images[1].year}`}
              className="rounded-xl shadow-md h-full w-[250px] h-[159px] lg:max-w-[250px] object-cover"
            />
            <p className="text-center mt-3 text-orange-900 text-base leading-relaxed">
              محله سیدی - سال {images[1].year}
            </p>
          </motion.div>
        </div>
      </section>

      {/* مودال بزرگنمایی تصویر */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className="relative max-w-3xl w-full px-4">
            {/* دکمه بستن */}
            <button
              onClick={closeModal}
              className="absolute top-4 left-4 bg-orange-100 hover:bg-orange-200 text-orange-900 p-1 rounded-full shadow-md z-10"
            >
              <XIcon size={24} />
            </button>

            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 shadow-lg flex flex-col items-center">
              <img
                src={images[selectedImageIndex].src}
                alt={`محله سیدی - سال ${images[selectedImageIndex].year}`}
                className="w-full h-auto rounded-xl max-h-[70vh] object-contain"
              />
              <p className="mt-4 text-orange-900 text-lg font-semibold text-center">
                محله سیدی - سال {images[selectedImageIndex].year}
              </p>

              {/* دکمه‌های قبلی و بعدی */}
              <div className="mt-4 flex justify-between w-full px-6">
                <button
                  onClick={showPrev}
                  className="bg-orange-100 hover:bg-orange-200 text-orange-900 p-2 rounded-full"
                >
                  <ArrowRightIcon size={28} />
                </button>
                <button
                  onClick={showNext}
                  className="bg-orange-100 hover:bg-orange-200 text-orange-900 p-2 rounded-full"
                >
                  <ArrowLeftIcon size={28} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default History;
