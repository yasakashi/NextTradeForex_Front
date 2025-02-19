import CategoriesScreen from "../pages/categories/view/categories_screen";
import CategoriesDetailsView from "../pages/categories/view/category_details_view_screen";
import EditCategoryComponent from "../pages/categories/view/components/edit_category_components";
import MarketPulseListScreen from "../pages/lessons/market-pulse/forex/forexList";
import MarketPulseNewCourseScreen from "../pages/lessons/market-pulse/forex/newForex";
import AllBooksScreen from "../pages/pdf_books/view/all_books_screen";
import CoursesScreen from "../pages/tutor/courses/view/courses_screen";
import LessonsScreen from "../pages/tutor/lessons/view/lessons_screen";
import NewCourse from "../../pages/profile/new_course";
import CourseBuilderPage from "../../pages/profile/new_course_components/CourseBuilderPage";
import IndicesList from "../pages/lessons/market-pulse/indice/indiceList";
import AddIndice from "../pages/lessons/market-pulse/indice/newIndice";
import CourseMeetingAndPdf from "../../pages/profile/new_course_components/CourseMeetingAndPdf";
import LTRVideos from "../pages/learn-to-trade/videos/LTRVieos";
import LTRPodcasts from "../pages/learn-to-trade/podcasts/LTRPodcasts";
import AddNewVideo from "../pages/learn-to-trade/videos/AddNewVideo";
import AddNewPodcast from "../pages/learn-to-trade/podcasts/AddNewPodcast";
import LTRLessons from "../pages/learn-to-trade/lessons/LTRLessons";
import AddNewLesson from "../pages/learn-to-trade/lessons/AddNewLesson";
import LTREBooks from "../pages/learn-to-trade/e-books/LTREBooks";
import AddNewEBook from "../pages/learn-to-trade/e-books/AddNewEbook";
import LTRWebinars from "../pages/learn-to-trade/webinars/LTRWebinars";
import AddNewWebinar from "../pages/learn-to-trade/webinars/AddNewWebinar";
import LTRTopics from "../pages/learn-to-trade/topics/LTRTopics";
import AddNewTopic from "../pages/learn-to-trade/topics/AddNewTopic";
import CommodityList from "../pages/lessons/market-pulse/commodity/commoditiesList";
import AddCommodity from "../pages/lessons/market-pulse/commodity/newCommodity";
import CommodityDetails from "../pages/lessons/market-pulse/commodity/editCommodity";
import CryptoList from "../pages/lessons/market-pulse/crypto/cryptoList";
import CryptoDetails from "../pages/lessons/market-pulse/crypto/cryptoDetails";
import AddCrypto from "../pages/lessons/market-pulse/crypto/addCrypto";
import ForumPosts from "../pages/posts/Forum/ForumPosts";
import AddNewForumPost from "../pages/posts/Forum/AddNewForumPost";
import BlogPosts from "../pages/posts/blog/BlogPosts";
import AddNewBlogPost from "../pages/posts/blog/AddNewBlogPost";
import TicketsList from "../pages/fluent-supports/tickets/TicketsList";
import AdminTicketView from "../pages/fluent-supports/tickets/TicketView";
import StockList from "../pages/lessons/market-pulse/stock/stockList";
import StocksDetails from "../pages/lessons/market-pulse/stock/stockDetails";
import AddStock from "../pages/lessons/market-pulse/stock/addStock";
import AdminPanel from "../pages/admin-panel/AdminPanle";
import MediaLibrary from "../pages/media/Library";
import AddNewMediaFile from "../pages/media/AddNewMediaFile";
import AllUsers from "../pages/users/AllUsers";
import AddNewUser from "../pages/users/AddNewUser";
import AdminUsersProfile from "../pages/users/Profile";
import ChartList from '../pages/lessons/market-pulse/charting/chartList';
import ChartDetails from '../pages/lessons/market-pulse/charting/chartDetails';
import AddChart from '../pages/lessons/market-pulse/charting/addChart';
import StrategyList from '../pages/lessons/market-pulse/strategy/strategyList';
import StrategyDetails from '../pages/lessons/market-pulse/strategy/strategyDetails';
import AddStrategy from '../pages/lessons/market-pulse/strategy/addStrategy';

export const admin_panel_router = [
  // topics
  {
    route: '/admin-panel/learn-to-trade/topics',
    component: <LTRTopics />,
  },
  // add new webinar
  {
    route: '/admin-panel/learn-to-trade/topics/add-new-topic',
    component: <AddNewTopic />,
  },
  // ============= learn to trade and tools
  // webinars
  {
    route: '/admin-panel/learn-to-trade/webinars',
    component: <LTRWebinars />,
  },

  {
    route: "/admin-panel/tools/webinars",
    component: <LTRWebinars page="tools" />,
  },
  // add new webinar
  {
    route: '/admin-panel/learn-to-trade/webinars/add-new-webinar',
    component: <AddNewWebinar />,
  },

  {
    route: "/admin-panel/tools/webinars/add-new-webinar",
    component: <AddNewWebinar page="tools" />,
  },
  //e-books
  {
    route: '/admin-panel/learn-to-trade/e-books',
    component: <LTREBooks />,
  },

  {
    route: "/admin-panel/tools/e-books",
    component: <LTREBooks page="tools" />,
  },
  // add new e-book
  {
    route: '/admin-panel/learn-to-trade/e-books/add-new-book',
    component: <AddNewEBook />,
  },

  {
    route: "/admin-panel/tools/e-books/add-new-book",
    component: <AddNewEBook page="tools" />,
  },
  {
    route: '/admin-panel/learn-to-trade/lessons',
    component: <LTRLessons />,
  },
  {
    route: '/admin-panel/learn-to-trade/lessons/add-new-lesson',
    component: <AddNewLesson />,
  },
  {
    route: '/admin-panel/learn-to-trade/videos',
    component: <LTRVideos />,
  },
  {
    route: '/admin-panel/learn-to-trade/videos/add-new-video',
    component: <AddNewVideo />,
  },

  {
    route: '/admin-panel/learn-to-trade/podcasts',
    component: <LTRPodcasts />,
  },

  {
    route: "/admin-panel/tools/podcasts",
    component: <LTRPodcasts page="tools" />,
  },
  {
    route: '/admin-panel/learn-to-trade/podcasts/add-new-podcast',
    component: <AddNewPodcast />,
  },

  {
    route: "/admin-panel/tools/podcasts/add-new-podcast",
    component: <AddNewPodcast page="tools" />,
  },
  { route: "/admin-panel/lesson/categories", component: <CategoriesScreen /> },

  {
    route: '/admin-panel/lesson/categories/edit/:id',
    component: <EditCategoryComponent />,
  },
  {
    route: '/admin-panel/lesson/categories/:id',
    component: <CategoriesDetailsView />,
  },
  {
    route: '/admin-panel/tutor/Courses',
    component: <CoursesScreen />,
  },
  {
    route: '/admin-panel/tutor/lessons',
    component: <LessonsScreen />,
  },
  {
    route: '/admin-panel/pdf_books/all_books',
    component: <AllBooksScreen />,
  },

  // ============= posts
  {
    route: '/admin-panel/posts/forum-posts',
    component: <ForumPosts />,
  },
  {
    route: '/admin-panel/posts/forum-posts/add-new-forum-post',
    component: <AddNewForumPost />,
  },

  {
    route: '/admin-panel/posts/blog-posts',
    component: <BlogPosts />,
  },
  {
    route: '/admin-panel/posts/blog-posts/add-new-blog-post',
    component: <AddNewBlogPost />,
  },

  // ============ flutent support

  {
    route: '/admin-panel/fluent-support/tickets',
    component: <TicketsList />,
  },
  {
    route: '/admin-panel/fluent-support/tickets/:id/view',
    component: <AdminTicketView />,
  },
  // ============== course
  {
    route: '/admin-panel/tutor/Courses/create-new-course',
    component: <NewCourse page="admin" />,
  },

  {
    route: '/admin-panel/tutor/Courses/edit-course/:id',
    component: <NewCourse page="admin" />,
  },
  {
    route:
      '/admin-panel/tutor/Courses/create-new-course/course-builder/:courseId',
    component: <CourseBuilderPage page="admin" />,
  },

  {
    route:
      '/admin-panel/tutor/Courses/create-new-course/add-meeting-pdf/:courseId',
    component: <CourseMeetingAndPdf page="admin" />,
  },

  // ====admin panel=======
  {
    route: "/admin-panel",
    component: <AdminPanel />,
  },

  // Media

  {
    route: "/admin-panel/media/library",
    component: <MediaLibrary />,
  },
  {
    route: "/admin-panel/media/add-new-media-file",
    component: <AddNewMediaFile />,
  },

  // users

  {
    route: "/admin-panel/users/all-users",
    component: <AllUsers />,
  },
  {
    route: "/admin-panel/users/add-new-user",
    component: <AddNewUser />,
  },
  {
    route: "/admin-panel/users/profile",
    component: <AdminUsersProfile />,
  },

  // market pulse
  {
    route: '/admin-panel/lessons/market-pulse',
    component: <MarketPulseListScreen />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/forex/:id',
    component: <MarketPulseNewCourseScreen />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/indices',
    component: <IndicesList />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/indices/:id',
    component: <AddIndice />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/commodities',
    component: <CommodityList />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/commodities/:id',
    component: <CommodityDetails />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/commodities/add',
    component: <AddCommodity />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/crypto',
    component: <CryptoList />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/crypto/:id',
    component: <CryptoDetails />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/crypto/add',
    component: <AddCrypto />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/stocks',
    component: <StockList />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/stocks/:id',
    component: <StocksDetails />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/stocks/add',
    component: <AddStock />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/forex-chart',
    component: <ChartList />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/forex-chart/:id',
    component: <ChartDetails />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/forex-chart/add',
    component: <AddChart />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/strategy',
    component: <StrategyList />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/strategy/:id',
    component: <StrategyDetails />,
  },
  {
    route: '/admin-panel/lessons/market-pulse/strategy/add',
    component: <AddStrategy />,
  },
];
