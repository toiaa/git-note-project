const CloseIcon: React.FC<IconProps> = ({
  width = 10,
  height = 10,
  color = "#55597D",
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
          d="M9.063.938.937 9.062m0-8.124 8.126 8.124"
        />
      </svg>
    </div>
  );
};

export default CloseIcon;
