import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import en from './en.json';
import zh_CN from './zh-CN.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  "en": {
    translation: en
  },
  "zh-CN": {
    translation: zh_CN
  },
};

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en-US", // use en if detected lng is not available
    // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

// 在你的 JavaScript 文件或 Tauri 应用的前端逻辑中
const systemLanguage = navigator.language;
console.log(systemLanguage); // 输出用户的系统语言，例如 'en-US'
// i18n.changeLanguage("aaa"); // 切换语言为中文

// const currentLocale = i18n.language;

// console.log(currentLocale); // 输出当前的语言代码
export default i18n;