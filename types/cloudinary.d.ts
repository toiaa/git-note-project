type UploadResultImage = {
  info: {
    url: string;
    public_id: string;
    secure_url: string;
  };
  event: "success" | "error";
};
