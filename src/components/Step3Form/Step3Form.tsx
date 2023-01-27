import { Field, FieldArray, ErrorMessage, FormikProps } from "formik";
import { Fragment, useState, useEffect } from "react";

import FormControl from "../FormControl";
import dishes from "../../dishes.json";

import { FormValues } from "@/types";

import "./Step3Form.css";

type Props = {
  form: FormikProps<FormValues>;
  onPrevious: () => void;
};

const Step3Form = (props: Props) => {
  const { form, onPrevious } = props;

  const [hasEnoughServings, setHasEnoughServings] = useState<boolean>(false);

  console.log(hasEnoughServings);

  useEffect(() => {
    const totalServings = getTotalServings();
    const hasEnough = totalServings >= form.values.totalPeople;

    setHasEnoughServings(hasEnough);
  }, [form.values.dishes]);

  const handleBeforeSubmit = () => {
    hasEnoughServings && form.handleSubmit();
  };

  const handlePrevious = () => {
    form.setFieldValue("dishes", [{ name: "", servings: 1 }]);

    onPrevious();
  };

  const getDishOptions = () => {
    const options = dishes.dishes.filter(
      (dish) =>
        dish.restaurant === form.values.restaurant &&
        dish.availableMeals.includes(form.values.category)
    );

    return options;
  };

  const getTotalServings = () => {
    return form.values.dishes.reduce((total, dish) => total + dish.servings, 0);
  };

  return (
    <>
      <FieldArray name="dishes">
        {({ insert, remove, push }) => (
          <>
            <div className="step3-form-container">
              <label>Please select a dish</label>
              <label>Please enter no. of servings</label>

              {form.values.dishes.length > 0 &&
                form.values.dishes.map((dish, index) => (
                  <Fragment key={index}>
                    <div>
                      <Field
                        className={
                          form.errors.dishes?.[index] &&
                          form.touched.dishes?.[index]
                            ? "error"
                            : undefined
                        }
                        as="select"
                        name={`dishes.${index}.name`}
                      >
                        <option value="" disabled>
                          ---
                        </option>
                        {getDishOptions().map((dish) => (
                          <option
                            key={dish.id}
                            value={dish.name}
                            disabled={form.values.dishes.some(
                              (formDish) => formDish.name === dish.name
                            )}
                          >
                            {dish.name}
                          </option>
                        ))}
                      </Field>

                      <ErrorMessage
                        name={`dishes.${index}.name`}
                        component="div"
                      />
                    </div>

                    <div>
                      <Field
                        type="number"
                        name={`dishes.${index}.servings`}
                        min="1"
                      />

                      {form.values.dishes.length > 1 && (
                        <button
                          className="remove-btn"
                          onClick={() => remove(index)}
                        >
                          -
                        </button>
                      )}
                    </div>
                  </Fragment>
                ))}

              {form.values.dishes.length < getDishOptions().length && (
                <button
                  className="add-btn"
                  onClick={() => push({ name: "", servings: 1 })}
                >
                  Add
                </button>
              )}
            </div>

            {!hasEnoughServings && (
              <div className="error-container">{`Your only order ${getTotalServings()} servings for total of ${
                form.values.totalPeople
              } people which is not enough`}</div>
            )}

            <FormControl
              disabledNext={!hasEnoughServings}
              onNext={handleBeforeSubmit}
              onPrevious={handlePrevious}
            />
          </>
        )}
      </FieldArray>
    </>
  );
};

export default Step3Form;
