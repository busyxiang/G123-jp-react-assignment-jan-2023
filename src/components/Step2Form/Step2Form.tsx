import { Field, FormikProps } from "formik";
import { groupBy } from "lodash";

import FormControl from "../FormControl";
import dishes from "../../dishes.json";

import { FormValues } from "@/types";

type Props = {
  form: FormikProps<FormValues>;
  onPrevious: () => void;
};

const Step2Form = (props: Props) => {
  const { form, onPrevious } = props;

  const handlePrevious = () => {
    form.setFieldValue("restaurant", "");

    onPrevious();
  };

  const getRestaurantOptions = () => {
    const dishesAvailable = dishes.dishes.filter((dish) =>
      dish.availableMeals.includes(form.values.category)
    );

    const restaurants = groupBy(dishesAvailable, "restaurant");

    return Object.keys(restaurants);
  };

  return (
    <>
      <div className="form-field-container">
        <label>Please select a restaurant</label>
        <br />
        <Field
          className={
            form.errors.restaurant && form.touched.restaurant
              ? "error"
              : undefined
          }
          as="select"
          name="restaurant"
        >
          <option value="" disabled>
            ---
          </option>

          {getRestaurantOptions().map((restaurant) => (
            <option key={restaurant} value={restaurant}>
              {restaurant}
            </option>
          ))}
        </Field>
        {form.errors.restaurant && form.touched.restaurant && (
          <div>{form.errors.restaurant}</div>
        )}
      </div>

      <FormControl onPrevious={handlePrevious} />
    </>
  );
};

export default Step2Form;
