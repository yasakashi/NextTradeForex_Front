import CategoriesScreen from "../pages/categories/view/categories_screen";
import CategoriesDetailsView from "../pages/categories/view/category_details_view_screen";
import EditCategoryComponent from "../pages/categories/view/components/edit_category_components";
import AllBooksScreen from "../pages/pdf_books/view/all_books_screen";
import CoursesScreen from "../pages/tutor/courses/view/courses_screen";
import LessonsScreen from "../pages/tutor/lessons/view/lessons_screen";

export const admin_panel_router = [
  { route: "/admin-panel/lesson/cateogies", component: <CategoriesScreen /> },
  {
    route: "/admin-panel/lesson/cateogies/edit/:id",
    component: <EditCategoryComponent />,
  },
  {
    route: "/admin-panel/lesson/cateogies/:id",
    component: <CategoriesDetailsView />,
  },
  {
    route: "/admin-panel/tutor/Courses",
    component: <CoursesScreen />,
  },
  {
    route: "/admin-panel/tutor/lessons",
    component: <LessonsScreen />,
  },
  {
    route: "/admin-panel/pdf_books/all_books",
    component: <AllBooksScreen />,
  },
];
