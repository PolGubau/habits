import { selector } from "recoil";
import { yourShopsAtom } from "./Atoms";

export const getShopCategories = selector({
  key: "getShopCategoriesSelector",
  get: ({ get }) => {
    const yourShops = get(yourShopsAtom);
    const categories = yourShops.map((cat) => cat.label);
    return categories;
  },
  set: ({ set }, newValue: any) => {
    set(yourShopsAtom, (oldValue) => [...oldValue, newValue]);
  },
});
