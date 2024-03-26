"use client";
import React, { useState } from "react";
import Steps from "./Steps";
import BoardingForm from "./BoardingForm";
const OnBoarding = () => {
  const [step, setStep] = useState(0);
  const NUMBER_OF_STEPS = 4;
  const goToNextStep = () =>
    setStep((prev) => (prev === NUMBER_OF_STEPS ? prev : prev + 1));
  return (
    <div className=" w-[600px] rounded-xl bg-dark-800 p-8">
      <div className="flex w-full items-center justify-center">
        <Steps currentStep={step} numberOfSteps={NUMBER_OF_STEPS} />
      </div>
      <BoardingForm step={step} goToNextStep={goToNextStep} />
    </div>
  );
};

export default OnBoarding;
