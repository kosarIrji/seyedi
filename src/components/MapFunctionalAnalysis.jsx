import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { parse } from "papaparse";
import Accordion from "./Accordion";
const isMobile = window.innerWidth < 768;
const isLaptop = window.innerWidth < 1000;

const MapLanduse = () => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const tileLayerRef = useRef(null);

  const baseMaps = {
    osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    light:
      "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
    carto: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  };

  const landuseMapping = {
    10: "زمین خالی و بایر",
    11: "مسکونی",
    12: "اموزشی تحقیقات",
    13: "آموزشی",
    14: "اداری",
    15: "تجاری",
    17: "درمانی",
    23: "حمل ونقل شهری",
    19: "فضای سبز",
    21: "تاسیسات شهری",
    22: "تجهیزات شهری",
    30: "مختلط تجاری-مسکونی",
    20: " مذهبی",
    16:"ورزشی",
    18: "فرهنگی هنری",
    25:"باغات و کشاورزی",
  };

  const landuseColors = {
    "باغات و کشاورزی":"rgb(180,16,134)",
    "زمین خالی و بایر": "rgb(200,200,200)", // رنگ پیش‌فرض انتخاب شده
    مسکونی: "rgb(255,255,0)",
    آموزشی: "rgb(155,215,200)", // به جای "آموزشی تحقیقات" و "آموزشی"
    اداری: "rgb(144,144,144)",
    تجاری: "rgb(255,0,0)",
    درمانی: "rgb(0,200,150)", // رنگ پیشنهادی چون در لیست اصلی نبود
    "حمل ونقل شهری": "rgb(129,151,253)",
    "فضای سبز": "rgb(0,255,0)", // رنگ پیشنهادی چون در لیست اصلی نبود
    "تاسیسات شهری": "rgb(155,157,0)", // تطبیق با "تجهیزات شهری"
    "تجهیزات شهری": "rgb(20,250,360)",
    " مذهبی":"rgb(15,120,130)",
    "ورزشی":"rgb(191,255,0)",
    "فرهنگی هنری": "rgb(18,250,190)",
    "مختلط تجاری-مسکونی": "rgb(142,63,127)",
  };

  const getColorByLanduseCode = (code) => {
    const name = landuseMapping[code];
    return landuseColors[name] || "#cccccc";
  };

  useEffect(() => {
    const map = L.map(mapRef.current, {
      zoomControl: false,
      scrollWheelZoom: true,
    }).setView([37.474, 57.3337], 14);

    const tileLayer = L.tileLayer(baseMaps.osm).addTo(map);
    tileLayerRef.current = tileLayer;
    setMapInstance(map);

    fetch("./data/M3_ss.geojson")
      .then((res) => res.json())
      .then((data) => {
        const layer = L.geoJSON(data, {
          style: function (feature) {
            const code = parseInt(feature.properties.Landuse_id);
            const landuseName = feature.properties.landuse_name;

            return {
              color: "#333",
              weight: 0.8,
              fillColor: getColorByLanduseCode(code),
              fillOpacity: 0.7,
            };
          },
          onEachFeature: function (feature, layer) {
            const code = parseInt(feature.properties.Landuse_id);
            const name = landuseMapping[code] || "نامشخص";
            const landuseName = feature.properties.landuse_name;

            layer.bindPopup(
              `<p style="text-align: right ; " >فعالیت: ${landuseName} <br/>` +
                `
          نوع کاربری:${name} </p>`,
              {
                permanent: false,
                direction: "top",
                className: "landuse-label",
              }
            );
          },
        }).addTo(map);

        map.fitBounds(layer.getBounds());
        map.setMinZoom(16);
        map.setMaxZoom(18);
        map.setMaxBounds(layer.getBounds());

        const basemapControl = L.control({ position: "topright" });
        basemapControl.onAdd = function () {
          const div = L.DomUtil.create("div", "map-style-control");
          div.innerHTML = `
            <select id="basemapSelect" calss="map-style-control">
            <option value="osm" >OSM کلاسیک</option>
              <option value="light">Light</option>
              <option value="carto">Carto Streets</option>
            
            </select>
          `;
          return div;
        };
        basemapControl.addTo(map);

        setTimeout(() => {
          document
            .getElementById("basemapSelect")
            .addEventListener("change", (e) => {
              tileLayer.setUrl(baseMaps[e.target.value]);
            });
        }, 500);
      })
      .catch((err) => {
        console.error("خطا در خواندن GeoJSON:", err);
      });

    return () => map.remove();
  }, []);

  const [showHelp, setShowHelp] = useState(false);

  return (
    <div
      style={{ direction: "rtl", fontFamily: "Modam", position: "relative" }}
    >
      <div
        id="map"
        ref={mapRef}
        style={{
          borderRadius: "10px",
          height: isMobile ? (isLaptop ? "600px" : "600px") : "600px",
          width: "100%",
        }}
      ></div>
     {/* اکاردئون راهنمای کاربری روی نقشه */}
<div
  className="z-[1000]"
  style={{
    
        
         
    backdropFilter: "blur(8px)",   
    position: "absolute",
    bottom: "2px",
    right: "2px",
    width: "210px",
    fontFamily: "Modam",
    fontSize:"15px",
  }}
>
<Accordion
  title={
   
    <span className="text-base font-bold bg-text-right" style={{ fontFamily: "Modam" }}>
      راهنمای کاربری
    </span>
  }
  content={
    <div
      className="space-y-1 text-sm text-right w-full rounded-xl"
      style={{
      
       
        fontFamily: "Modam",
      }}
    >
      {Object.entries(landuseColors).map(([label, color], index) => (
        <div key={index} className="flex items-center flex-row-reverse gap-2 justify-end">
          <span className="text-base ">{label}</span>
          <span
            className="inline-block w-4 h-4 rounded"
            style={{ backgroundColor: color }}
          ></span>
        </div>
      ))}
    </div>
  }
  defaultOpen={isMobile?false:true}
/>

    
</div>

      {/* دکمه راهنما + متن کمکی */}
      <div className="absolute top-4 left-4 z-[1000] pointer-events-auto">
        <div className="relative inline-block">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="bg-[var(--sidebar)] px-4 py-2 text-white rounded-full shadow-sm text-base hover:bg-[var(--sidebar)] transition-all"
          >
            ؟
          </button>

          {showHelp && (
            <div className="absolute top-full mt-2 left-0 bg-white/50 backdrop-blur-sm text-gray-800 shadow-lg border border-gray-300 rounded-md p-4 w-64 z-[2000]">
              <div className="font-bold mb-2">راهنمای استفاده از نقشه:</div>
              <ul className="list-disc pr-5 text-base space-y-1 text-right">
                <li>روی هر قطعه زمین کلیک کنید تا اطلاعات نمایش داده شود.</li>
                <li>نقشه قابل حرکت و زوم است.</li>
              </ul>
            </div>
          )}
        </div>
        <style>{/* استایل‌هایت اینجا */}</style>
      </div>
      <style>{`
        @font-face {
          font-family: 'Modam';
          src: url('./fonts/Modam.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        html, body, #root {
          text-align:right;
          height: 100%;
          margin: 0;
          padding: 0;
          border-radius:10px
        }
 
        .legend {
          font-family: 'Modam';
          background: [#FFF6EB];
          padding: 10px;
          border-radius: 5px;
          box-shadow: 0 0 5px #aaa;
          font-size: 14px;
          color:#000; 
        }

        .legend-color-box {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-left: 6px;
          vertical-align: middle;
        }

        .landuse-label{
          font-family: 'Modam' !important;
          font-weight: bold;
         
          border-radius: 5px;
        
          font-size: 13px;
          text-align: right;
            }
            
        .map-style-control {
          background:white/30;
          backdrop-filter:blur(8px);
          padding: 8px;
          border-radius: 5px;
          box-shadow: 0 0 5px rgba(0,0,0,0.3);
          font-family: 'Modam';
          color: #000;
        }

        .map-style-control select {
          backdrop-filter:blur(8px);
          padding: 4px 8px;
          font-size: 14px;
          font-family: 'Modam';
        }
      `}</style>
    </div>
  );
};

export default MapLanduse;
