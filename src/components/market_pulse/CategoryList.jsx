import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getGroupCategory } from '../../redux/features/groupSlice';
import TreeChildCategory from '../TreeChildCategory';

function CourseLevelType({ categoryId, onCategoryChange }) {
  const [category, setCategory] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { groupCategories, getCategoryLoading } = useSelector(
    (state) => state.group
  );

  useEffect(() => {
    dispatch(getGroupCategory({ axiosPrivate, parentId: 770 }));
  }, []);

  useEffect(() => {
    const activeCategory = groupCategories.find((cat) => categoryId === cat.id);
    if (!activeCategory) return;

    // Check if activeCategory already exists in selectedCategories
    setSelectedCategories((prev) => {
      // If the activeCategory is not already in prev, add it
      if (!prev.some((cat) => cat.id === activeCategory.id)) {
        return [...prev, activeCategory];
      }
      return prev; // Return the previous state if it already exists
    });
  }, [groupCategories, categoryId]);

  useEffect(() => {
    const cat = selectedCategories.slice(-1);
    if (!cat || !cat.length) return;
    onCategoryChange(cat[0].id);
  }, [selectedCategories, onCategoryChange]);

  return (
    <div className="rounded-sm bg-white p-[30px]">
      <h1 className="font-bold text-sm">category</h1>

      <TreeChildCategory
        page="posts"
        loading={getCategoryLoading}
        data={groupCategories}
        setCategory={setCategory}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
    </div>
  );
}

export default CourseLevelType;
