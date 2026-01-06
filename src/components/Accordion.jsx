import { useState, useEffect } from "react";
import{ChevronDown
}from "lucide-react"
export default function Accordion({ title, content, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <div className="border  rounded-lg mb-2 overflow-hidden shadow-sm transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-1 bg-white/20 hover:bg-white/15 text-right transition-colors"
      >
        <span className=" text-gray-800">{title}</span>
        <span
          className={`text-gray-500 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
         <ChevronDown/>
        </span>

      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-196 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-white/10 text-gray-700 text-base leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
}
