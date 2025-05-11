/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          verde: "#006C5B",
          blanco: "#FFFFFF",
          grisoscuro: "#666666",
          grisclaro: "#F5F5F5",
          verdeclaro: "#009486",
          grisoscuro2: "#4D5159",
          violeta: "#772583",
          verdeoscuro: "#093838"
        },
        fontFamily: {
            lexend: ['Lexend', 'sans-serif'],
            sans: ['Barlow', 'Montserrat', 'Roboto', 'sans-serif'],
        },
        borderRadius: {
          "21xl": "40px",
          "16xl": "35px",
          "181xl": "200px",
          "31xl": "50px",
        },
      },
      fontSize: {
        xl: "20px",
        lg: "18px",
        sm: "14px",
        inherit: "inherit",
      },
      screens: {
        mq1024: {
          raw: "screen and (max-width: 1024px)",
        },
        mq980: {
            raw: "screen and (max-width: 980px)",
          },
        mq780: {
          raw: "screen and (max-width: 780px)",
        }
       
      }
      
    },
   
  };