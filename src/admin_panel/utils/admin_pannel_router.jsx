import CategoriesScreen from "../pages/categories/view/categories_screen";
import CategoriesDetailsView from "../pages/categories/view/category_details_view_screen";
import EditCategoryComponent from "../pages/categories/view/components/edit_category_components";
import MarketPulseListScreen from "../pages/lessons/market-pulse/view/market_pulse_list_screen";
import MarketPulseNewCourseScreen from "../pages/lessons/market-pulse/view/new_course_screen";
import AllBooksScreen from "../pages/pdf_books/view/all_books_screen";
import CoursesScreen from "../pages/tutor/courses/view/courses_screen";
import LessonsScreen from "../pages/tutor/lessons/view/lessons_screen";
import NewCourse from "../../pages/profile/new_course";
import CourseBuilderPage from "../../pages/profile/new_course_components/CourseBuilderPage";
import CourseMeetingAndPdf from '../../pages/profile/new_course_components/CourseMeetingAndPdf'

export const admin_panel_router = [
  // { route: "/admin-panel/lesson/cateogies", component: <CategoriesScreen /> },
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
  {
    route: "/admin-panel/tutor/Courses/create-new-course",
    component: <NewCourse page="admin" />,
  },
  {
    route:
      "/admin-panel/tutor/Courses/create-new-course/course-builder/:courseId",
    component: <CourseBuilderPage page="admin" />,
  },

  {
    route:
      "/admin-panel/tutor/Courses/create-new-course/add-meeting-pdf/:courseId",
    component: <CourseMeetingAndPdf page="admin" />,
  },

  {
    route: "/admin-panel/lessons/market-pulse",
    component: <MarketPulseListScreen />,
  },
  {
    route: "/admin-panel/lessons/market-pulse/:id",
    component: <MarketPulseNewCourseScreen />,
  },
];
