"use client";
import React, { useState } from "react";
import Steps from "./Steps";
import { Button } from "../ui/button";
const OnBoarding = () => {
  const [step, setStep] = useState(0);
  const NUMBER_OF_STEPS = 4;
  const goToNextStep = () =>
    setStep((prev) => (prev === NUMBER_OF_STEPS ? prev : prev + 1));
  const goToPreviousStep = () =>
    setStep((prev) => (prev <= 0 ? prev : prev - 1));

  return (
    <div className="h-[536px] w-[600px] rounded-xl bg-dark-800">
      <div className="flex w-full items-center justify-center">
        <Steps currentStep={step} numberOfSteps={NUMBER_OF_STEPS} />
      </div>
      <h1 className="h2-bold text-light-300">Basic Information</h1>
      <Button onClick={goToPreviousStep} className="bg-primary-500">
        Previous
      </Button>
      <Button onClick={goToNextStep} className="bg-primary-500">
        Next
      </Button>
    </div>
  );
};

export default OnBoarding;
