import { HighlightJSTheme } from "./renderer";

const styleCache = new Map();

const topLevelPropertiesToRemove = [
  "color",
  "textShadow",
  "textAlign",
  "whiteSpace",
  "wordSpacing",
  "wordBreak",
  "wordWrap",
  "lineHeight",
  "MozTabSize",
  "OTabSize",
  "tabSize",
  "WebkitHyphens",
  "MozHyphens",
  "msHyphens",
  "hyphens",
  "fontFamily"
];

const generateNewStylesheet = ({
  stylesheet
}: {
  stylesheet: HighlightJSTheme;
}) => {
  if (styleCache.has(stylesheet)) {
    return styleCache.get(stylesheet);
  }
  const transformedStyle: HighlightJSTheme = Object.entries(stylesheet).reduce(
    (newStylesheet, [className, style]) => {
      newStylesheet[className] = Object.entries(style).reduce(
        (newStyle, [key, value]) => {
          if (key === "overflowX" || key === "overflow") {
            newStyle.overflow = value === "auto" ? "scroll" : value;
          } else if (value.includes("em")) {
            const [num] = value.split("em");
            newStyle[key] = Number(num) * 16;
          } else if (key === "background") {
            newStyle.backgroundColor = value;
          } else if (key === "display") {
            return newStyle;
          } else {
            newStyle[key] = value;
          }
          return newStyle;
        },
        {}
      );
      return newStylesheet;
    },
    {}
  );
  const topLevel = transformedStyle.hljs;
  const defaultColor = (topLevel && topLevel.color) || "#000";
  topLevelPropertiesToRemove.forEach(property => {
    if (topLevel[property]) {
      delete topLevel[property];
    }
  });
  if (topLevel.backgroundColor === "none") {
    delete topLevel.backgroundColor;
  }
  styleCache.set(stylesheet, { transformedStyle, defaultColor });
  return { transformedStyle, defaultColor };
};

export default generateNewStylesheet;
