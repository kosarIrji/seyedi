const { color } = require("framer-motion");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "500px",
        lg: "924px",
        xl: "1180px",
        md: "1200px",
        "2xl": "1536px",
      },
      fontSize: {
     
        xs: "0.85rem", // 12px
        sm: "1.2rem", // 14px
        base: "15px", // 16px
        lg: "1.3rem", // 18px
        xl: "1.1rem", // 20px
        "2xl": "1.2rem", // 24px
        "3xl": "1.3rem", // 30px
      }, 
      
      fontFamily: {
        modam: ["Modam", "sans-serif"],
      },
    },
  },
  rtl: "class", // این گزینه در سطح بالا نیست و جایش درست نیست
  plugins: [],
};
