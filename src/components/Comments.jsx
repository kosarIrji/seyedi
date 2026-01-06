/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import Detail from "../components/config/details.json";
import { MessageCircle } from "lucide-react";
export default function Comments() {
  return (
    <section className="w-full mt-3">
      {/* باکس توضیحات */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className=" rounded-2xl shadow-sm p-5  border lg:col-span-3 bg-white/50 backdrop-blur-md mb-3"
      >
        <h3 className=" text-3xl    w-full flex flex-row-reverse aling-centeritems-center text-right justify-end gap-2  font-modam font-extrabold   text-[var(--text)] mb-2 leading-snug">
          ارسال نظرات و پیشنهادات <span>
            <MessageCircle size={28} />
          </span>
        </h3>
        <div className="md:flex md:justify-between ">
          <p className=" md:leading-loose mb-2   lg:leading-loose font-modam  text-justify text-base ">
            در صورت تمایل به ثبت نظر یا پیشنهاد، می‌توانید از طریق بات تلگرام ما
            دیدگاه خود را ارسال نمایید.
          </p>
          <div className="flex flex-row-reverse">

          <Button>
            <a
              href="https://t.me/Hominex_bot"
              target="_blank"
              rel="noopener"
              class=""
            >
              ارسال نظر از طریق تلگرام
            </a>
          </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
