const CloudUploadIcon: React.FC<IconProps> = ({
  width = 10,
  height = 10,
  color = "#ADB3CC",
}: IconProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
      >
        <g clipPath="url(#a)">
          <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13.593 12.26A3.333 3.333 0 0 0 12 6h-.84A5.333 5.333 0 1 0 2 10.867M8 14V8m0 0 2.667 2.666M8 8l-2.667 2.666"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h16v16H0z" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default CloudUploadIcon;
