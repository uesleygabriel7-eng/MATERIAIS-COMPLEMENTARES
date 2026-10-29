const {
  useState,
  useEffect,
  useMemo,
  Fragment
} = React;

// ==========================================
// ÍCONES SVG
// ==========================================
const IconUser = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-8 h-8"
}, /*#__PURE__*/React.createElement("path", {
  d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "7",
  r: "4"
}));
const IconCalculator = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-5 h-5"
}, /*#__PURE__*/React.createElement("rect", {
  width: "16",
  height: "20",
  x: "4",
  y: "2",
  rx: "2"
}), /*#__PURE__*/React.createElement("line", {
  x1: "8",
  x2: "16",
  y1: "6",
  y2: "6"
}), /*#__PURE__*/React.createElement("line", {
  x1: "16",
  x2: "16",
  y1: "14",
  y2: "18"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 10h.01"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 10h.01"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 10h.01"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 14h.01"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 14h.01"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 18h.01"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 18h.01"
}));
const IconSave = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-4 h-4"
}, /*#__PURE__*/React.createElement("path", {
  d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "17 21 17 13 7 13 7 21"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "7 3 7 8 15 8"
}));
const IconRotate = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-4 h-4"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 3v5h5"
}));
const IconPrinter = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-4 h-4"
}, /*#__PURE__*/React.createElement("polyline", {
  points: "6 9 6 2 18 2 18 9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
}), /*#__PURE__*/React.createElement("rect", {
  width: "12",
  height: "8",
  x: "6",
  y: "14"
}));
const IconExcel = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-4 h-4"
}, /*#__PURE__*/React.createElement("rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  ry: "2"
}), /*#__PURE__*/React.createElement("line", {
  x1: "3",
  x2: "21",
  y1: "9",
  y2: "9"
}), /*#__PURE__*/React.createElement("line", {
  x1: "9",
  x2: "9",
  y1: "9",
  y2: "21"
}));
const IconArrowLeft = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-5 h-5"
}, /*#__PURE__*/React.createElement("line", {
  x1: "19",
  x2: "5",
  y1: "12",
  y2: "12"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "12 19 5 12 12 5"
}));
const IconPlus = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-4 h-4"
}, /*#__PURE__*/React.createElement("line", {
  x1: "12",
  x2: "12",
  y1: "5",
  y2: "19"
}), /*#__PURE__*/React.createElement("line", {
  x1: "5",
  x2: "19",
  y1: "12",
  y2: "12"
}));
const IconTrash = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-4 h-4"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 6h18"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
}), /*#__PURE__*/React.createElement("line", {
  x1: "10",
  x2: "10",
  y1: "11",
  y2: "17"
}), /*#__PURE__*/React.createElement("line", {
  x1: "14",
  x2: "14",
  y1: "11",
  y2: "17"
}));
const IconClip = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-4 h-4"
}, /*#__PURE__*/React.createElement("path", {
  d: "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
}));
const IconCamera = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-4 h-4 text-blue-600"
}, /*#__PURE__*/React.createElement("path", {
  d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "13",
  r: "4"
}));
const IconComment = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-5 h-5"
}, /*#__PURE__*/React.createElement("path", {
  d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
}));
const IconClose = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-6 h-6"
}, /*#__PURE__*/React.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
}));