const UploadIcon: React.FC<IconProps> = ({
  width = 10,
  height = 10,
  color = "#1D2032",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill-rule="evenodd"
        clipRule="evenodd"
        d="M14.7951 0.853342L5.24843 10.0667L2.71509 7.36001C2.24843 6.92001 1.51509 6.89334 0.981761 7.26668C0.461761 7.65334 0.315094 8.33334 0.635094 8.88001L3.63509 13.76C3.92843 14.2133 4.43509 14.4933 5.00843 14.4933C5.55509 14.4933 6.07509 14.2133 6.36843 13.76C6.84843 13.1333 16.0084 2.21334 16.0084 2.21334C17.2084 0.986675 15.7551 -0.093324 14.7951 0.840009V0.853342Z"
        fill={color}
      />
    </svg>
  );
};

export default UploadIcon;