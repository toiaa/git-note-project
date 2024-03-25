import * as React from "react";
const CalendarIcon: React.FC<IconProps> = ({
  width = 16,
  height = 16,
  color = "#55597D",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.667 1.333V4M5.333 1.333V4M2 6.667h12m-10.667-4h9.334C13.403 2.667 14 3.264 14 4v9.334c0 .736-.597 1.333-1.333 1.333H3.333A1.333 1.333 0 0 1 2 13.334V4c0-.736.597-1.333 1.333-1.333Z"
    />
  </svg>
);
export default CalendarIcon;
