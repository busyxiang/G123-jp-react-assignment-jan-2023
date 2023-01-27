import { FormikProps } from "formik";
import { upperFirst } from "lodash";

import FormControl from "../FormControl";

import { FormValues } from "@/types";

import "./Review.css";

type Props = {
  form: FormikProps<FormValues>;
  onPrevious: () => void;
};

const Review = (props: Props) => {
  const { form, onPrevious } = props;

  return (
    <div>
      <div className="review-container">
        <label>Meal</label>
        <div>{upperFirst(form.values.category)}</div>

        <label>No. of People</label>
        <div>{form.values.totalPeople}</div>

        <label>Restaurant</label>
        <div>{form.values.restaurant}</div>

        <label>Dishes</label>
        <div className="dishes-container">
          {form.values.dishes.map((dish) => (
            <div key={dish.name}>{`${dish.name} - ${dish.servings}`}</div>
          ))}
        </div>
      </div>

      <FormControl showNext={false} onPrevious={onPrevious} />
    </div>
  );
};

export default Review;
