import { useEffect } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { IFood } from "src/components/Forms/Food/utils/initialState";
import { NewFoodForm } from "src/components/Forms/Food/FoodNewForm";
import useFoodFunctions from "src/components/Forms/Food/utils/useFoodFunctions";
import LayoutPage from "src/Layouts/Layout";
import { foodState, loadingAtom } from "src/Recoil/Atoms";

const FoodPage = () => {
  const [, setLoading] = useRecoilState(loadingAtom);
  useEffect(() => {
    setLoading(false);
  }, []);
  const f = useFoodFunctions();
  const food = useRecoilValue(foodState);

  useEffect(() => {
    f.getFood();
  }, []);

  return (
    <LayoutPage>
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
    </LayoutPage>
  );
};
export default FoodPage;
