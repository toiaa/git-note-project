const CheckBoxIcon: React.FC<IconProps> = ({
  width = 19,
  height = 18,
  color = "#42BBFF",
  onClick,
}: IconProps) => {
  return (
    <div onClick={onClick}>
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
          d="M16.5 9v5.833a1.666 1.666 0 0 1-1.667 1.667H3.167A1.667 1.667 0 0 1 1.5 14.833V3.167A1.667 1.667 0 0 1 3.167 1.5h9.166M6.5 8.167l2.5 2.5 8.333-8.334"
        />
      </svg>
    </div>
  );
};

export default CheckBoxIcon;
