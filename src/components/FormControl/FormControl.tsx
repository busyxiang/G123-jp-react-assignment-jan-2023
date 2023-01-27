import "./FormControl.css";

type Props = {
  showNext?: boolean;
  disabledNext?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
};

const FormControl = (props: Props) => {
  const { showNext = true, disabledNext = false, onNext, onPrevious } = props;

  return (
    <div className="form-control-container">
      {onPrevious && (
        <button className="previous-btn" onClick={onPrevious}>
          Previous
        </button>
      )}

      {showNext && (
        <button
          type={onNext ? "button" : "submit"}
          disabled={disabledNext}
          onClick={onNext}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default FormControl;
