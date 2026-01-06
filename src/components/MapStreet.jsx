import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "../components/Button";


import L from "leaflet";
const isMobile = window.innerWidth < 724;
const isLaptop = window.innerWidth < 1000;

// رنگ بر اساس ترافیک
const getColorByTraffic = (value) => {
  const strVal = String(value).trim();
  switch (strVal) {
    case "5":
      return "#d73027";
    case "4":
      return "#fc8d59";
    case "3":
      return "#fee08b";
    case "2":
      return "#d9ef8b";
    case "1":
      return "#1a9850";
    default:
      return "#999";
  }
};
const getColorNyKeymabar = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return "#ccc";
  if (num > 50) return "#1a9850";
  if (num > 40) return "#2ECC71";
  if (num > 30) return "#3498DB";
  if (num > 20) return "#457B9D";
  if (num > 10) return "#1D3557";
  return "#7bccc4";
};
// رنگ بر اساس عرض معبر
const getColorByWidth = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return "#ccc";
  if (num > 20) return "#084081";
  if (num > 15) return "#0868ac";
  if (num > 10) return "#2b8cbe";
  if (num > 5) return "#4eb3d3";
  return "#7bccc4";
};
// استایل خطوط
const layerStyles = {
  traffic: (feature) => ({
    color: getColorByTraffic(feature.properties.trafic),
    weight: 
    6,
    opacity: 0.9,
    dashArray: "4", // افزودن افکت Dash برای تنوع
  }),
  width: (feature) => ({
    color: getColorByWidth(feature.properties.Width),
    weight: 
    6,
    opacity: 0.9,
    dashArray: "4", // افزودن افکت Dash برای تنوع
  }),
  keymabar: (feature) => ({
    color: getColorNyKeymabar(feature.properties.keyfiat_ma),
    weight: 
    6,
    opacity: 0.9,
    dashArray: "4", // افزودن افکت Dash برای تنوع
  }),
};

// راهنما
const Legend = ({ type }) => {
  const legends = {
    traffic: [
      { color: "#d73027", label: "ترافیک خیلی زیاد " },
      { color: "#fc8d59", label: "ترافیک زیاد " },
      { color: "#fee08b", label: "ترافیک متوسط " },
      { color: "#d9ef8b", label: "ترافیک کم" },
      { color: "#1a9850", label: "ترافیک خیلی کم" },
    ],
    width: [
      { color: "#084081", label: "> 20 متر" },
      { color: "#0868ac", label: "15 - 20 متر" },
      { color: "#2b8cbe", label: "10 - 15 متر" },
      { color: "#4eb3d3", label: "5 - 10 متر" },
      { color: "#7bccc4", label: "< 5 متر" },
    ],
    keymabar: [
      { color: "#1a9850", label: "کیفیت خیلی خوب" },
      { color: "#2ECC71", label: "کیفیت خوب " },
      { color: "#3498DB", label: "کیفیت متوسط" },
      { color: "#457B9D", label: "کیفیت بد " },
      { color: "#1D3557", label: "کیفیت خیلی بد " },
    ],
  };

  return (
    <div className="absolute bottom-4 right-4  bg-white/40 backdrop-blur-md p-4 rounded-xl shadow-lg z-[1000] text-sm border border-gray-200 w-50 pointer-events-auto">
      <div className="font-bold text-center text-gray-800 mb-3">
        راهنمای نقشه
      </div>
      <div className="space-y-2">
        {legends[type].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-md border"
              style={{ backgroundColor: item.color }}
            ></div>
            <div className="text-gray-700 text-xs">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// کامپوننت مخصوص تعویض BaseMap
function BaseMapSwitcher({ setBaseLayerUrl }) {
  const tileUrls = {
    osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    light:
      "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",

    esri: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{x}/{y}",
  };

  return (
    <select
      onChange={(e) =>
        setBaseLayerUrl(tileUrls[e.target.value] || tileUrls.light)
      }
      style={{
        padding: "10px",
        borderRadius: "6px",
        fontSize: "14px",
        border: "1px solid #ccc",
        marginTop: "5px",
        color: "black",
      }}
      className="text-sm p-1 rounded-md transition-all ease-in-out bg-white/50 backdrop-blur-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="osm">osm کلاسیک</option>
      <option value="light">Light (سبک)</option>

      <option value="carto">Carto Streets</option>
    </select>
  );
}

// ✅ کامپوننت اصلی
export default function MapStreet() {
  const [geoData, setGeoData] = useState(null);
  const [layerType, setLayerType] = useState("traffic");
  const [baseLayerUrl, setBaseLayerUrl] = useState(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  const mapRef = useRef(null);

  useEffect(() => {
    fetch("./data/M3_s.geojson")
      .then((res) => res.json())
      .then((data) => {
        setGeoData(data);
      });
  }, []);

  // ✅ invalidateSize هنگام تغییر اندازه پنجره (مانند تبلت یا چرخش صفحه)
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };

    window.addEventListener("resize", handleResize);

    // پاک‌سازی event در unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [showHelp, setShowHelp] = useState(false);
  const settrafic = (value) => {
    const strVal = String(value).trim();
    switch (strVal) {
      case "5":
        return "خیلی زیاد";
      case "3":
        return "متوسط";
      case "2":
        return "کم";
      case "1":
        return "خیلی کم";
      case "4":
        return "زیاد";
      default:
        return;
    }
  };

  return (
    <div
      className="relative w-full h-full lg:h-[100%]"
      id="map" 
      ref={mapRef}
      style={{
        borderRadius: "10px",
        height: isMobile ? (isLaptop ? "600px" : "600px") : "600px",

        width: "100%",
      }}
    >
      {/* کنترل‌ها */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2 pointer-events-auto">
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => setLayerType("traffic")}
            variant={layerType === "traffic" ? "default" : "outline"}
            className="transition-all ease-in-out hover:bg-blue-500 hover:text-[#FFF6EB]"
          >
            ترافیک
          </Button>
          <Button
            onClick={() => setLayerType("width")}
            variant={layerType === "width" ? "default" : "outline"}
            className="transition-all ease-in-out hover:bg-blue-500 hover:text-[#FFF6EB]"
          >
            عرض معبر
          </Button>
          <Button
            onClick={() => setLayerType("keymabar")}
            variant={layerType === "keymabar" ? "default" : "outline"}
            className="transition-all ease-in-out hover:bg-blue-500 hover:text-[#FFF6EB]"
          >
            کیفیت معبر
          </Button>
        </div>
        <BaseMapSwitcher setBaseLayerUrl={setBaseLayerUrl} />
      </div>
      {/* نقشه */}
      <MapContainer
        center={[37.4650, 57.3380]}
        zoom={14}
        minZoom={16}
        maxZoom={18}
        scrollWheelZoom={true}
        zoomControl={false} // این خط دکمه‌های پیش‌فرض زوم رو حذف می‌کنه
        className="w-full h-full z-0 rounded-xl overflow-hidden"
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
          setTimeout(() => mapInstance.invalidateSize(), 100); // ⬅ رفع مشکل اولیه
        }}
      >
        <TileLayer
          url={baseLayerUrl}
          attribution="&copy; OpenStreetMap contributors"
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            style={layerStyles[layerType]}
            onEachFeature={(feature, layer) => {
              const { trafic, Width, Name, keyfiat_ma } = feature.properties;
            
              // Popup: با لمس باز می‌شه
              layer.bindPopup(`
                <div style="font-size: 13px; line-height: 1.5; font-family: Modam; text-align: right">
                  <strong>${Name || "نامشخص"}</strong><br/>
                  <strong>ترافیک:</strong> ${settrafic(trafic)}<br/>
                  <strong>عرض معبر:</strong> ${Width || "نامشخص"} متر<br/>
                  <strong>کیفیت معبر:</strong> ${keyfiat_ma || "نامشخص"} از 50
                </div>
              `);
            
              // ضخامت بیشتر برای لمس راحت‌تر
              layer.setStyle({
                ...layerStyles[layerType](feature),
                weight: 10,
              });
            
              // تغییر رنگ موقع لمس (کلیک)
              layer.on("click", function () {
                this.setStyle({
                  ...layerStyles[layerType](feature),
                  color: "#000", // تغییر رنگ به مشکی یا رنگ مورد نظر
                  weight: 10,
                });
            
                // برگشت به حالت اولیه بعد از چند ثانیه
                setTimeout(() => {
                  this.setStyle(layerStyles[layerType](feature));
                }, 2000);
              });
            }}
            
            
          />
        )}
      </MapContainer>
      <Legend type={layerType} />
      {/* دکمه راهنما + متن کمکی در بالا سمت چپ */}
      {/* // داخل return کامپوننت اصلی */}
      <div className="absolute top-4 left-4 z-[1000] pointer-events-auto">
        {/* دکمه راهنما */}
        <div className="relative inline-block">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="bg-[var(--sidebar)] px-4 py-2 rounded-full shadow-sm text-white text-base hover:bg-[var(--sidebar)] transition-all"
          >
            ؟
          </button>

          {/* باکس راهنما بدون اینکه جای دکمه رو تغییر بده */}
          {showHelp && (
            <div className="absolute top-full mt-2 left-0 bg-white/50 backdrop-blur-sm text-gray-800 shadow-lg border border-gray-300 rounded-md p-4 w-64 z-[2000]">
              <div className="font-bold mb-2">راهنمای استفاده از نقشه:</div>
              <ul className="list-disc pr-5 text-base space-y-1 text-right">
                <li>روی خیابان‌ها کلیک کنید تا اطلاعات نمایش داده شود.</li>
                <li>نقشه قابل حرکت و زوم است.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
