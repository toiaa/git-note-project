import { CheckIcon } from "lucide-react";
import { Fragment } from "react";
const Steps = ({ currentStep, numberOfSteps }: StepsProps) => {
  const activeColor = (index: number) => {
    return currentStep >= index
      ? "bg-primary-500 rounded-[9px]"
      : "bg-dark-600 rounded-[5px] ";
  };
  const colorBg = (index: number) => {
    return currentStep >= index ? "bg-dark-600 p-2" : "bg-dark-800";
  };
  const isChecked = (index: number) => {
    console.log({
      currentStep,
      index,
      numberOfSteps,
    });

    if (currentStep > index) return true;
    if (currentStep === numberOfSteps && currentStep === index) return false;
  };
  const isFinalStep = (index: number) => index === numberOfSteps - 1;
  return (
    <div className="flex items-center p-6">
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <Fragment key={index}>
          <div
            className={`flex size-[40px] items-center justify-center ${colorBg}`}
          >
            <div
              className={`${activeColor(index)} flex size-[32px] items-center justify-center`}
            >
              {isChecked(index) ? (
                <CheckIcon />
              ) : (
                <span className="size-[8px] rounded-full bg-dark-800"></span>
              )}
            </div>
          </div>
          {isFinalStep(index) ? null : (
            <span className={`h-0.5 w-[136px] ${activeColor(index)}`}></span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Steps;
