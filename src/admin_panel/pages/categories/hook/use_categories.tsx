import React from "react";
import { get_categories_api } from "../service/get_categoris_api";
import {
  loading_selector,
  useAppSelector,
} from "../../../../redux/features/generalSlice";
export interface CategoryModel {
  categorytypeid?: number;
  id: number;
  parentId?: number;
  categorytypename?: string;
  name: string;
  childs?: CategoryModel[];
}
const useCategories = ({ make_id_tree }: { make_id_tree?: boolean }) => {
  const [categories, set_categories] = React.useState<CategoryModel[]>([]);
  const loading = useAppSelector(loading_selector);
  React.useEffect(() => {
    get_categories_api()
      .then((res: CategoryModel[]) => {
        if (!make_id_tree) return set_categories(res);
        let parents = res.filter((item) => !!item.parentId);
        let without_parents = res.filter((item) => !item.parentId);
        let cats: CategoryModel[] = parents.map((cat, i) => {
          // if (!cat.parentId) return { ...cat };

          let childs = res.filter((s,index) => s.parentId === cat.id);
          return {
            ...cat, 
            
            childs:!!childs.length?childs:undefined,
          };
        }).filter(item=>!!item.childs);
        
        set_categories([...without_parents,...cats]);
      })
      .catch((err) => {});
  }, []);

  return { categories, loading };
};

export default useCategories;
