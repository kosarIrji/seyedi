import { useState } from "react";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import{GalleryHorizontal}from"lucide-react"

const images = [
  "./images/img (1).jpg",
  "./images/img (2).jpg",
  "./images/img (3).jpg",
  "./images/img (4).jpg",
  "./images/img(5).jpg",
  "./images/img (6).jpg",
  "./images/img (7).jpg",
  "./images/img (10).jpg",
  "./images/img (8).jpg",
  "./images/img (9).jpg",
];

export default function ImageGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClose = () => setSelectedIndex(null);
  const showPrev = () =>
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const showNext = () =>
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <section className="relative  bg-white/50 p-5 backdrop-blur-sm rounded-2xl shadow-lg px-3  border ">
      <div className="flex justify-center ">
        <h2 className="absolute text-3xl sm:text-2xl p-5  w-full flex flex-row-reverse aling-centeritems-center text-right justify-end gap-2  font-modam font-extrabold   text-[var(--text)] mb-4 leading-snug ">
        گالری تصاویر <GalleryHorizontal size={28}/>   
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-20">
          {images.map((src, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="overflow-hidden rounded-xl shadow-md cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={src}
                alt={`img-${index}`}
                className="w-full h-[200px] lg:h-[180px] md:h-[220px]  object-cover transition-all duration-300 rounded-xl"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-white/30 bg-opacity-80 flex items-center h-[100vh] justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4  text-[var(--text)] bg-white/50 bg-opacity-50 p-2 rounded-full md:justify-center"
            >
              <X size={24} />
            </button>
            <button
              onClick={showPrev}
              className="absolute left-4 text-[var(--text)] bg-white/50 bg-opacity-50 p-2 rounded-full"
            >
              <ChevronLeft size={32} />
            </button>
            <motion.img
             loading="lazy"
              key={selectedIndex}
              src={images[selectedIndex]}
              alt="full"
              className="max-w-xl lg:max-h-[50vh]object-contain max-h-[300px] w-[100%]  rounded-lg shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <button
              onClick={showNext}
              className="absolute md:right-50 right-4 text-[var(--text)] bg-white/50 bg-opacity-50 p-2 rounded-full "
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
