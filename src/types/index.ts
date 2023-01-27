export type MealCategory = "breakfast" | "lunch" | "dinner";

export type FormValues = {
  category: MealCategory;
  totalPeople: number;
  restaurant: string;
  dishes: { name: string; servings: number }[];
};
