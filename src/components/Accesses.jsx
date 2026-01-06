/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import AccsessesArzeMabar from "./AccessesArzeMabar";
import AccsessesKyfiatMabar from "./AccsessesKyfiatMabar";
import MapStreet from "./MapStreet";
import { Map } from "lucide-react";
import { Button } from "./Button";
import Details from "../components/config/details.json";
import { useState } from "react";

export default function Accesses() {
  const [selectedComponent, setSelectedComponent] = useState("key");

  return (
    <section className="w-full mt-3">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {/* باکس توضیحات */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className=" rounded-2xl shadow-sm p-5 border lg:col-span-2 bg-white/50 backdrop-blur-md "
        >
          <h3 className="text-3xl    w-full flex flex-row-reverse aling-centeritems-center text-right justify-end gap-2  font-modam font-extrabold   text-[var(--text)] mb-4 leading-snug">
            تحلیل دسترسی و کیفیت معابر محله {Details.alley.name}{" "}
            <span>
              <Map size={28} />
            </span>
          </h3>
          <p className="md:leading-loose lg:leading-loose font-modam  text-justify text-base  ">
            شبکه معابر محله سیدی عمدتاً ارگانیک، نامنظم و همراه با بن ‌بست ‌های
            متعدد است؛ معابر فرعی باریک و بیشتر مناسب تردد محلی هستند. خیابان
            ‌های سیدی، آزادی و تا حدی ملاصدرا، ارتباط با سایر محلات را فراهم
            می‌کنند، اما به ‌دلیل عرض کم و فضای پارک، عملکرد آنها در سطح محلی
            باقی مانده است. اتصال محله به شبکه شهری از طریق خیابان‌ های امام
            خمینی، هفده شهریور جنوبی و کمربندی مدرس انجام می‌شود که در ساعات
            اوج، ترافیکی متوسط دارند. میانگین کیفیت معابر در این محله ۳ ( از 5
            امتیاز)، ارزیابی شده و نیازمند ارتقاست.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" rounded-2xl shadow-sm p-5 border lg:col-span-2 lg:leading-loose bg-white/50 backdrop-blur-md "
        >
          <div className="flex flex-wrap justify-center gap-3 mb-2">
            {[
              { label: "عرض معبر", value: "arze" },
              { label: "کیفیت معبر", value: "key" },
            ].map((btn) => (
              <Button
                key={btn.value}
                onClick={() => setSelectedComponent(btn.value)}
                variant={
                  selectedComponent === btn.value ? "default" : "outline"
                }
                className="w-28 text-sm"
              >
                {btn.label}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selectedComponent === "arze" && (
              <motion.div
                key="arze"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <AccsessesArzeMabar />
              </motion.div>
            )}

            {selectedComponent === "key" && (
              <motion.div
                key="key"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <AccsessesKyfiatMabar />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* نقشه - کل عرض پایین */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 rounded-xl shadow-sm min-h-[600px] lg:h-full"
        >
          <MapStreet />
        </motion.div>
      </div>
    </section>
  );
}
