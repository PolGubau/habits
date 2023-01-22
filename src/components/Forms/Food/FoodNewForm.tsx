import axios from "axios";
import { useRecoilState } from "recoil";
import { FoodFormState } from "src/state/Selectors";
import PATH from "src/utils/path";
import { useState } from "react";
import { initialNewFoodState } from "./utils/initialState";
import useFoodFunctions from "./utils/useFoodFunctions";

export const NewFoodForm = () => {
  const f = useFoodFunctions();

  const [formState, setFormState] = useRecoilState(FoodFormState);

  //

  const [newIngredient, setNewIngredient] = useState<string>("");

  //

  const modifyNewFood = (e: { target: { name: string; value: string } }) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  //

  const sendNewFood = (e: any) => {
    e.preventDefault();
    try {
      axios.post(PATH.API.FOOD, formState);
      setFormState(initialNewFoodState);
      f.getFood();
    } catch (error) {
      console.log("error", error);
    }
  };
  const addNewIngredient = (e: any) => {
    e.preventDefault();

    setFormState({
      ...formState,
      ingredients: [...formState.ingredients, newIngredient],
    });

    newIngredient && setNewIngredient("");
  };

  return (
    <form>
      <input
        placeholder="name"
        type="text"
        name="name"
        onChange={modifyNewFood}
        required
        value={formState.name}
      />
      <input
        placeholder="location"
        type="text"
        name="location"
        onChange={modifyNewFood}
        required
        value={formState.location}
      />
      <input
        name="date"
        type="date"
        onChange={modifyNewFood}
        required
        value={formState.date}
      />
      <input
        name="time"
        type="time"
        onChange={modifyNewFood}
        required
        value={formState.time}
      />
      <div>
        Ingredientes:
        {formState.ingredients.map((ingredient, index) => (
          <p key={index}>{ingredient}</p>
        ))}
      </div>
      <input
        placeholder="ingredient"
        type="text"
        name="ingredient"
        value={newIngredient}
        onChange={(e) => setNewIngredient(e.target.value)}
      />
      <button onClick={addNewIngredient}>Add ingredient</button>

      <input type={"submit"} value="enviar" onClick={sendNewFood} />
    </form>
  );
};
