import React from "react";
import Account from "@/components/shared/Account/Account";

const RightNavBar = () => {
  return (
    <div className="sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l border-dark-600 bg-dark-800 p-6 pt-36 max-md:hidden">
      <Account />
    </div>
  );
};

export default RightNavBar;
