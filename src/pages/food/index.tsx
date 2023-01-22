import { useEffect } from "react";

import { useRecoilValue } from "recoil";
import { IFood } from "src/components/Forms/Food/utils/initialState";
import { NewFoodForm } from "src/components/Forms/Food/FoodNewForm";
import { getFood } from "src/state/Selectors";
import useFoodFunctions from "src/components/Forms/Food/utils/useFoodFunctions";

const FoodPage = () => {
  const f = useFoodFunctions();
  const food = useRecoilValue(getFood);

  useEffect(() => {
    f.getFood();
  }, []);

  return (
    <>
      <div>
        {food &&
          food.map((item: IFood) => (
            <div key={item.id}>
              <p>{item.id}</p>
              <p>{item.name}</p>

              <button
                onClick={() => {
                  f.deleteFood(item.id);
                }}
              >
                X
              </button>
            </div>
          ))}
      </div>
      <NewFoodForm />
    </>
  );
};
export default FoodPage;
