import React from "react";
import Header from "@/components/shared/header";
import OnBoarding from "@/components/OnBoarding";

const Page = async () => {
  return (
    <div className="w-full">
      <div className="">
        <Header />
      </div>
      <div className="container-custom mt-4 flex items-center justify-center self-center">
        <OnBoarding />
      </div>
    </div>
  );
};

export default Page;
