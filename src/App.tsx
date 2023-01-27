import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Stepper from "./components/Stepper";
import Step1Form from "./components/Step1Form";
import Step2Form from "./components/Step2Form";
import Step3Form from "./components/Step3Form";
import Review from "./components/Review";

import { FormValues, MealCategory } from "@/types";

import "./App.css";

function App() {
  const [stepIndex, setStepIndex] = useState<number>(0);

  const handleSubmit = (values: FormValues) => {
    if (stepIndex < 4) {
      setStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStepIndex((prev) => prev - 1);
  };

  const getValidationSchema = () => {
    if (stepIndex === 0) {
      return Yup.object({
        category: Yup.string().required("Category is required"),
        totalPeople: Yup.number()
          .required()
          .min(1, "Need at least 1 person")
          .max(10, "Maximum 10 people allowed"),
      });
    } else if (stepIndex === 1) {
      return Yup.object({
        restaurant: Yup.string().required("Restaurant is missing"),
      });
    } else if (stepIndex === 2) {
      return Yup.object({
        dishes: Yup.array(
          Yup.object({
            name: Yup.string().required("Dish is required"),
            servings: Yup.number().required().min(1),
          })
        ).min(1),
      });
    }

    return undefined;
  };

  return (
    <div className="App">
      <Stepper
        stepIndex={stepIndex}
        steps={["Step 1", "Step 2", "Step 3", "Review"]}
      />

      <Formik
        initialValues={
          {
            category: "" as MealCategory,
            totalPeople: 0,
            restaurant: "",
            dishes: [{ name: "", servings: 1 }],
          } as FormValues
        }
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
      >
        {(form) => (
          <Form>
            {stepIndex === 0 && <Step1Form form={form} />}{" "}
            {stepIndex === 1 && (
              <Step2Form form={form} onPrevious={handlePrevious} />
            )}
            {stepIndex === 2 && (
              <Step3Form form={form} onPrevious={handlePrevious} />
            )}
            {stepIndex === 3 && (
              <Review form={form} onPrevious={handlePrevious} />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
