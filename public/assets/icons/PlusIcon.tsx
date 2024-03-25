const PlusIcon: React.FC<IconProps> = ({
  width = 12,
  height = 12,
  color = "#42BBFF",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M3.276.167h5.442c1.984 0 3.115 1.12 3.115 3.109v5.448c0 1.978-1.125 3.11-3.109 3.11H3.276c-1.99 0-3.11-1.132-3.11-3.11V3.276c0-1.99 1.12-3.11 3.11-3.11Zm3.202 6.317h1.657a.492.492 0 0 0 .484-.49.483.483 0 0 0-.484-.484H6.478V3.865a.483.483 0 1 0-.968 0V5.51H3.86a.506.506 0 0 0-.345.14.492.492 0 0 0 .344.834H5.51v1.651a.483.483 0 1 0 .968 0v-1.65Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default PlusIcon;
