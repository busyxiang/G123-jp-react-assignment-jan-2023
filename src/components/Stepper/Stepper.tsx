import "./Stepper.css";

type Props = {
  stepIndex: number;
  steps: string[];
};

const Stepper = (props: Props) => {
  const { stepIndex, steps } = props;

  return (
    <div className="steps-wrapper">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step-container ${stepIndex === index ? "active" : ""}`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
