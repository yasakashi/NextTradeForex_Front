// src/components/GoogleTranslate.js
import React, { useEffect } from "react";
// import "./GoogleTranslate.css"; // Import the custom CSS file

const GoogleTranslate = () => {
  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit =
        function googleTranslateElementInit() {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en" },
            "google_translate_element"
          );
        };

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    } else {
      window.googleTranslateElementInit();
    }
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
