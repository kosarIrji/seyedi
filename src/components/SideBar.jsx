import React, { useState, useRef, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import {
  Info,
  LocateIcon,
  BookOpen,
  Ruler,
  Layers,
  Map,
  Heart,
  ClipboardCheck,
  GalleryHorizontal,
  Home,
  TrendingUp,
  MessageCircle,
} from "lucide-react";

const menuItems = [
  { id: "home", label: "انتخاب محله", icon: <Home size={18} />, external: true },
  { id: "identify", label: "شناسنامه", icon: <Info size={18} /> },
  { id: "location", label: "موقعیت", icon: <LocateIcon size={18} /> },
  { id: "history", label: "تاریخچه", icon: <BookOpen size={18} /> },
  { id: "physical", label: "تحلیل کالبدی", icon: <Ruler size={18} /> },
  { id: "functional", label: "تحلیل عملکردی", icon: <Layers size={18} /> },
  { id: "accesses", label: "دسترسی‌ها", icon: <Map size={18} /> },
  { id: "priorities", label: "سرمایه گذاری", icon: <TrendingUp size={18} /> },
  { id: "quality", label: "کیفیت زندگی", icon: <Heart size={18} /> },
  { id: "summary", label: "جمع‌بندی", icon: <ClipboardCheck size={18} /> },
  {
    id: "comments",
    label: "نظرات وپیشنهادات",
    icon: <MessageCircle size={18} />,
  },
  {
    id: "images",
    label: "گالری تصاویر",
    icon: <GalleryHorizontal size={18} />,
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  // فقط به دکمه وصل می‌کنیم
  const toggleRef = useRef(null);

  // برای درگ
  const dragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const startY = useRef(0);
  const isHorizontal = useRef(false);
  const startOpen = useRef(false);
  const dragHandled = useRef(false); // برای جلوگیری از تداخل click بعد از درگ
  const width = 260;

  // قفل اسکرول وقتی منو باز است
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // فقط به toggle button: pointerdown/touchstart می‌زنیم
  useEffect(() => {
    const toggle = toggleRef.current;
    const sidebar = sidebarRef.current;
    if (!toggle || !sidebar) return;

    const getXY = (ev) => {
      if (typeof ev.clientX === "number" && typeof ev.clientY === "number") {
        return { x: ev.clientX, y: ev.clientY };
      }
      if (ev.touches && ev.touches[0]) {
        return { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
      }
      if (ev.changedTouches && ev.changedTouches[0]) {
        return { x: ev.changedTouches[0].clientX, y: ev.changedTouches[0].clientY };
      }
      return { x: 0, y: 0 };
    };

    const onDown = (e) => {
      const { x, y } = getXY(e);
      dragging.current = true;
      startX.current = x;
      startY.current = y;
      currentX.current = x;
      isHorizontal.current = false;
      startOpen.current = open;
      dragHandled.current = false;
      sidebar.style.transition = "none";
    };

    const onMove = (e) => {
      if (!dragging.current) return;
      const { x, y } = getXY(e);
      const deltaX = x - startX.current;
      const deltaY = y - startY.current;

      // تشخیص جهت: اگر عمودی بیشتر بود => لغو درگ تا اجازه اسکرول داده شود
      if (!isHorizontal.current) {
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          dragging.current = false;
          sidebar.style.transition = "";
          sidebar.style.transform = "";
          return;
        }
        isHorizontal.current = true;
      }

      // وقتی حرکت افقی است، از اسکرول صفحه جلوگیری کن
      if (e.cancelable) e.preventDefault();

      currentX.current = x;

      // محاسبه‌ی translate براساس وضعیت شروع
      let translate = (startOpen.current ? 0 : -width) + deltaX;
      translate = Math.min(0, Math.max(translate, -width));
      sidebar.style.transform = `translateX(${translate}px)`;
    };

    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      sidebar.style.transition = "transform 300ms cubic-bezier(.2,.8,.2,1)";
      const delta = currentX.current - startX.current;
      const threshold = Math.max(40, width * 0.15);

      // اگر خیلی کم حرکت شده، کاری نکن — click دکمه اینجا وظیفه‌ی باز/بسته کردن را دارد
      if (Math.abs(delta) < threshold) {
        sidebar.style.transform = "";
        return;
      }

      // اگر درگ بزرگ بوده، خودمان باز/بسته را اعمال می‌کنیم و جلوی click را می‌گیریم
      if (startOpen.current) {
        if (delta < -threshold) setOpen(false);
        else setOpen(true);
      } else {
        if (delta > threshold) setOpen(true);
        else setOpen(false);
      }

      dragHandled.current = true;
      // ریست نشدنِ آنی ممکن است باعث جلوگیری از click بعدی شود، پس بعد از کمی ریست می‌کنیم
      setTimeout(() => {
        dragHandled.current = false;
      }, 50);

      sidebar.style.transform = "";
    };

    // attach only to toggle (pointerdown/touchstart) + global move/up
    toggle.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    // touch fallback: touchmove با passive:false تا بتوانیم preventDefault کنیم
    toggle.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchcancel", onUp);

    return () => {
      toggle.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);

      toggle.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("touchcancel", onUp);
    };
  }, [open]);

  return (
    <>
      {/* دسکتاپ */}
      <aside className="hidden md:flex fixed top-0 right-0 h-full w-[230px] bg-gradient-to-b from-green-800/80 to-green-700/80 backdrop:blur-2xl bg-opacity-80 shadow-lg z-[1000] flex-col pt-5 px-3">
        <nav className="w-full">
          <ul className="space-y-2 text-sm">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.external ? (
                  <a
                    href="https://hominow.ir/mahallat/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row-reverse items-center justify-end gap-2 text-white hover:text-green-300 hover:bg-white/10 rounded-md px-3 py-2 transition-all"
                  >
                    <span>{item.label}</span>
                    {item.icon}
                  </a>
                ) : (
                  <ScrollLink
                    to={item.id}
                    smooth
                    duration={500}
                    offset={-100}
                    className="flex flex-row-reverse items-center justify-end gap-2 text-white hover:text-green-300 hover:bg-white/10 rounded-md px-3 py-2 transition-all"
                  >
                    <span>{item.label}</span>
                    {item.icon}
                  </ScrollLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* موبایل/تبلت */}
      <div className="md:hidden fixed top-0 left-0 h-full z-[9999]">
        <aside
          ref={sidebarRef}
          className={`absolute top-0 left-0 h-full bg-white/30 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ width }}
        >
          <div className="p-5 overflow-auto h-full"> {/* overflow-auto برای اسکرول داخلی */}
            <img
              src="./images/logo.png"
              alt="لوگو"
              className="w-32 h-auto mx-auto "
            />
            <nav>
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    {item.external ? (
                      <a
                        href="https://hominow.ir/mahallat/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="flex flex-row-reverse items-center justify-end gap-2 text-black hover:text-gray-800 hover:bg-gray-50 rounded-md px-3 py-2 transition-all"
                      >
                        <span>{item.label}</span>
                        {item.icon}
                      </a>
                    ) : (
                      <ScrollLink
                        to={item.id}
                        smooth
                        duration={500}
                        offset={-100}
                        onClick={() => {
                          setTimeout(() => setOpen(false), 150);
                        }}
                        className="flex flex-row-reverse items-center justify-end gap-2 text-black hover:text-gray-800 hover:bg-gray-50 rounded-md px-3 py-2 transition-all"
                      >
                        <span>{item.label}</span>
                        {item.icon}
                      </ScrollLink>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* دکمه چسبیده به سایدبار (این دکمه هم درگ‌هندل را شروع می‌کند) */}
          <button
            ref={toggleRef}
            onClick={(e) => {
              // اگر درگ بزرگ همین‌الان اجرا شده بود، جلوی click را می‌گیریم
              if (dragHandled.current) {
                e.preventDefault();
                e.stopPropagation();
                return;
              }
              setOpen((s) => !s);
            }}
            className={`absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 w-[40px] h-[80px] 
               rounded-r-3xl bg-white/30 backdrop-blur-md border ml-5 border-white/50 shadow-lg 
               flex items-center justify-center hover:scale-105 transition-transform`}
          >
            <svg
              className={`w-8 h-8  text-green-800 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </aside>
      </div>
    </>
  );
}
