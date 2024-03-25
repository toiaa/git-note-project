import React from "react";
import { ImageIcon } from "lucide-react";

const PicturePreview = () => {
  const handleImageUpload = () => {
    // use cloundinary to upload image
  };
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex size-[100px] items-center justify-center rounded bg-dark-700 p-3"
        onClick={handleImageUpload}
      >
        <ImageIcon width={20} height={20} />
      </div>
    </div>
  );
};

export default PicturePreview;
