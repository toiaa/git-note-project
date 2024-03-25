interface StepsProps {
  currentStep: number;
  numberOfSteps: number;
}
interface StepProps {
  goToNextStep: () => void;
}

interface BoardingFormProps {
  step: number;
  goToNextStep: () => void;
}

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  size?: number;
  onClick?: () => void;
}
