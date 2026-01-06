import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "./Button";
const isMobile = window.innerWidth < 768;
const isLaptop = window.innerWidth < 1000;

const MapAnalysis = () => {
  const mapRef = useRef(null);
  const [showHelp, setShowHelp] = useState(false);
  const baseLayerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [geoLayer, setGeoLayer] = useState(null);
  const [layerType, setLayerType] = useState("qdmt");

  const legendsData = {
    tdad_tbqe: {
      title: "تعداد طبقات",
      values: {
        0: "همکف",
        1: "۱ طبقه",
        2: "۲ طبقه",
        3: "۳ طبقه",
        4: "۴ طبقه",
        5: "۵ طبقه",
        6: "۶ طبقه",
        100: "بایر",
      },
      colors: [
        "#07F49E", // همکف
        "#11CC99", // ۱ طبقه
        "#1BA493",
        "#257C8E",
        "#2E5489",
        "#382C83",
        "#42047E",
        "#CCC", // مخروبه
      ],
    },

    qdmt: {
      title: "قدمت ساختمان",
      values: {
        0: "بایر",
        1: "درحال ساخت",
        2: "۱ تا ۵ سال",
        3: "۵ تا۱۵  سال",
        4: "۳۰تا ۱۵ سال",
        5: "۵۰ تا ۳۰ سال",
        6: "غیر قایل سکونت",
      },
      colors: [
        "#E76F51",
        "#EE8959",
        "#F4A261",
        "#E9C46A",
        "#2A9D8F",
        "#287271",
        "#264653",
      ],
    },
    nama: {
      title: "نمای ساختمان",
      values: {
        0: "بایر",
        1: "نمای سنگی",
        2: "نمای آجر",
        3: "نمای ترکیبی",
        4: "نمای کامپوزیت",
        5: "نمای سیمانی",
        6: "بدون نما ",
        7: "در حال ساخت",
        8: " مغازه",
      },
      colors: [
        "#DBB3B1",
        "#A0B7CF",
        "#FED35D",
        "#E76F51",
        "#8CD9F8",
        "#EA9E8D",
        "#73D3C9",
        "#96E6B3",
        "#FF7073",
      ],
    },
  };

  const baseMaps = {
    osm: () =>
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),

    light: () =>
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        { attribution: "&copy; CartoDB" }
      ),
    carto: () =>
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        { attribution: "&copy; CartoDB" }
      ),
    esri: () =>
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{x}/{y}",
        { attribution: "&copy; Esri" }
      ),
  };

  useEffect(() => {
    const initMap = L.map(mapRef.current, {
      center: [37.4712, 57.3333],
      zoom: 14,
      minZoom: 16,
      maxZoom: 18,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    // اجرای خودکار در بار اول
    const base = baseMaps["osm"]();
    base.addTo(initMap);
    baseLayerRef.current = base;
    setMap(initMap);

    fetch("./data/M3_ss.geojson")
      .then((res) => res.json())
      .then((data) => {
        setGeoData(data);
        drawLayer(data, "qdmt", initMap);
        drawLegend("qdmt");
        initMap.fitBounds(L.geoJSON(data).getBounds());
      })
      .catch((error) => console.error("Error loading GeoJSON data:", error));

    return () => initMap.remove();
  }, []);
  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 100); // تا Leaflet بعد از render اندازه‌گیری کند
    }
  }, [map]);

  const switchBaseMap = (type) => {
    if (!map) return;
    if (baseLayerRef.current) map.removeLayer(baseLayerRef.current);
    const newBase = baseMaps[type]();
    newBase.addTo(map);
    baseLayerRef.current = newBase;
  };

  const getColor = (type, value) => {
    const val = parseInt(value);
    return legendsData[type].colors[val] || "#ccc";
  };

  const legendRef = useRef(null);

  const drawLegend = (type) => {
    if (!map) return;

    // حذف legend قبلی اگر وجود دارد
    if (legendRef.current) {
      map.removeControl(legendRef.current);
      legendRef.current = null;
    }

    const legendControl = L.control({ position: "bottomright" });

    legendControl.onAdd = () => {
      const div = L.DomUtil.create("div", "legend");
      const grades = Object.entries(legendsData[type].values);

      div.innerHTML += `<h4 class="font-bold text-sm">${legendsData[type].title}</h4>`;
      grades.forEach(([key, label]) => {
        const color = getColor(type, parseInt(key));
        div.innerHTML += `
        <div class="flex items-center gap-2 4px text-xs">
          <div style="width:20px;height:20px;background:${color};border-radius: 5px;"></div>
          <span>${label}</span>
        </div>
      `;
      });

      return div;
    };

    legendControl.addTo(map);

    // ذخیره در ref برای دفعات بعد
    legendRef.current = legendControl;
  };

  const drawLayer = (data, type, mapInstance) => {
    if (geoLayer) {
      geoLayer.remove();
    }

    const newLayer = L.geoJSON(data, {
      style: (feature) => ({
        color: "#555",
        fontFamily: "modam",
        weight: 0.5,
        fillColor: getColor(type, feature.properties[type]),
        fillOpacity: 0.75,
      }),
      onEachFeature: (feature, layer) => {
        const p = feature.properties;
        const qdmtLabel = legendsData.qdmt.values[parseInt(p.qdmt)] || "-";
        const namaLabel = legendsData.nama.values[parseInt(p.nama)] || "-";
       
        let tbqeLabel = "-";
        if (p.tdad_tbqe !== undefined && p.tdad_tbqe !== null) {
          const tbqeVal = parseInt(p.tdad_tbqe);
          if (tbqeVal === 0) tbqeLabel = "همکف";
          else if (tbqeVal === 100) tbqeLabel = "مخروبه";
          else tbqeLabel = legendsData.tdad_tbqe.values[tbqeVal] || "-";
        }

        layer.bindPopup(
          `<div style="text-align:right">
          
        <b>طبقات:</b> ${tbqeLabel}<br>
        <b>قدمت:</b> ${qdmtLabel}<br>
        <b>نما:</b> ${namaLabel}
        </div>
      `,
          {
            permanent: false,
            direction: "top",
            className: "landuse-label ",
          }
        );
      },
    });

    newLayer.addTo(mapInstance);

    setGeoLayer(newLayer);

    // حتماً این خط باید اینجا باشد تا legend همزمان با layer رسم شود
    drawLegend(type);
  };

  const handleMapTypeChange = (type) => {
    setLayerType(type);
    if (geoData && map) drawLayer(geoData, type, map);
  };
  useEffect(() => {
    if (map && geoData) {
      drawLegend(layerType);
    }
  }, [map, geoData]);

  return (
    <div style={{ direction: "rtl", fontFamily: "Modam" }}>
      <div style={{ position: "relative" }}>
        <div
          id="map"
          ref={mapRef}
          style={{
            borderRadius: "10px",
            height: isMobile ? (isLaptop ? "600px" : "600px") : "600px",
            width: "100%",
          }}
        ></div>
        {/* دکمه راهنما + متن کمکی */}
        <div className="absolute top-4 left-4 z-[1000] pointer-events-auto">
          <div className="relative inline-block">
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="bg-[var(--sidebar)] px-4 py-2  text-white rounded-full shadow-sm text-base hover:bg-[var(--sidebar)] transition-all"
            >
              ؟
            </button>

            {showHelp && (
              <div className="absolute top-full mt-2 left-0 bg-white/50 backdrop-blur-sm text-gray-800 shadow-lg border border-gray-300 rounded-md p-1 w-56 z-[2000]">
                <div className="font-bold mb-2">راهنمای استفاده از نقشه:</div>
                <ul className="list-disc pr-5  text-[14px] space-y-1 text-right">
                  <li>روی هر قطعه زمین کلیک کنید تا اطلاعات نمایش داده شود.</li>
                  <li>نقشه قابل حرکت و زوم است.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Button
            onClick={() => handleMapTypeChange("tdad_tbqe")}
            variant={layerType === "tdad_tbqe" ? "default" : "outline"}
          >
            نقشه طبقات
          </Button>
          <Button
            onClick={() => handleMapTypeChange("qdmt")}
            variant={layerType === "qdmt" ? "default" : "outline"}
          >
            نقشه قدمت
          </Button>
          <Button
            onClick={() => handleMapTypeChange("nama")}
            variant={layerType === "nama" ? "default" : "outline"}
          >
            نقشه نما
          </Button>
          <select
            className="bg-white/40 backdrop-blur-sm"
            onChange={(e) => switchBaseMap(e.target.value)}
            style={{
              padding: "10px 5px",
              borderRadius: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              marginTop: "5px",
              color: "black",
            }}
          >
            <option value="osm">OSM کلاسیک</option>
            <option value="light">Light (سبک)</option>

            <option value="carto">Carto Streets</option>
          </select>
        </div>
      </div>

      <style>{`
        .legend {
          
          backdrop-filter:blur(8px);
          padding: 10px;
          line-height: 1.8;
          border-radius: 5px;
          box-shadow: 0 0 5px #aaa;
          font-size: 13px;
        }
        .legend i {
          display: inline-block;
          width: 18px;
          height: 18px;
          margin-left: 6px;
          vertical-align: middle;
          border: 1px solid #999;
          border-radius: 5px;
        }
        .landuse-label {
          font-family: 'Modam' !important;
          font-weight: bold;
          color: #222;

          border-radius: 5px;
 
          font-size: 14px;
          text-align: center;
               }
         
      `}</style>
    </div>
  );
};

export default MapAnalysis;
