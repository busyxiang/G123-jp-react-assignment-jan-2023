import { Field, FormikProps } from "formik";

import FormControl from "../FormControl";

import { FormValues } from "@/types";

type Props = {
  form: FormikProps<FormValues>;
};

const Step1Form = (props: Props) => {
  const { form } = props;

  return (
    <>
      <div className="form-field-container">
        <label>Please select a meal</label>
        <br />
        <Field
          className={
            form.errors.category && form.touched.category ? "error" : undefined
          }
          as="select"
          name="category"
        >
          <option value="" disabled>
            ---
          </option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </Field>
        {form.errors.category && form.touched.category && (
          <div>{form.errors.category}</div>
        )}
      </div>

      <div>
        <label>Please enter number of people</label>
        <br />
        <Field
          className={
            form.errors.totalPeople && form.touched.totalPeople
              ? "error"
              : undefined
          }
          type="number"
          name="totalPeople"
          min="1"
          max="10"
        />
      </div>

      <FormControl />
    </>
  );
};

export default Step1Form;
