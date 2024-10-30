import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/admin/AdminPage';
import './App.css';
import {
  CommunityGroup,
  CommunityGroups,
  CreateGroup,
  Home,
  Login,
  Register,
  TradersCommunity,
} from './pages';
// import 'bootstrap/dist/css/bootstrap.min.css';

import UserProfile from './pages/profile/userProfile';
import ProfileDashboard from './components/profile/ProfileDashboard';

import MyProfile from './components/profile/MyProfile';
import MyGroups from './components/profile/MyGroups';
import Requests from './components/profile/Requests';
import MySignals from './components/profile/MySignals';
// import EnrolledCourses from "./components/profile/EnrolledCourses";
import OrderHistory from './components/profile/OrderHistory';
import Settings from './components/profile/settings/Settings';
import Profile from './components/profile/settings/Profile';
import ResetPassword from './components/profile/settings/ResetPassword';
import Withdraw from './components/profile/settings/withdraw/Withdraw';
import SocialProfile from './components/profile/settings/SociaProfile';
// import MyCourses from "./components/profile/instructorCourses/MyCourses";
import Withdrawals from './components/profile/withdrawals/Withdrawals';

import { Toaster } from 'react-hot-toast';
import AllMemberShipRequest from './pages/master/AllMemberShipRequest';
import CreateSignalChannel from './pages/tradersCommunity/signalChannals/CreateSignalChannel';
import CreateSignal from './pages/tradersCommunity/signalChannals/CreateSignal';
import GoogleTranslate from './components/googleTranslate/GoogleTranslate';
import SignalChannel from './pages/tradersCommunity/signalChannals/SignalChannel';
import GroupHome from './components/tradersCommunity/group/home';
import Messages from './components/tradersCommunity/group/Messages';
import MessagesSnackbar from './components/message_snackbar';
import SignalsList from './pages/tradersCommunity/groups/SignalsList';
import GroupMembers from './pages/tradersCommunity/groups/group/GroupMembers';
import DashboardScreen from './pages/dashboard/view/dashboard_screen';
import React from 'react';
import { http_instanse } from './axios/auth_full_http_instanse';
import { get_user_info_api } from './pages/profile/my_courses/service/get_my_courses_api';
import MainLayout from './admin_panel/components/layout/main_layout';
import { admin_panel_router } from './admin_panel/utils/admin_pannel_router';
import LearnToTradeScreen from './pages/learn_to_trade/view/learn_to_trade_screen';
import SelectLearnToTrade from './pages/learn_to_trade/select_learn_to_trade';
import CategoriesToLearnScreen from './pages/learn_to_trade/courses_to_learn_screen';
import CategoryListToLearnScreen from './pages/learn_to_trade/category_list_to_learn_screen';
import CategoriesDetailsView from './admin_panel/pages/categories/view/category_details_view_screen';
import CourseDetails from './admin_panel/pages/tutor/courses/course_details/view/course_detasils';
import CourseAttachments from './admin_panel/pages/tutor/courses/course_atachments/view/course_attachments';
import PartnerShip from './pages/home/partnership/PartnerShip';
import PartnershipProfileView from './pages/home/partnership/PartnershipProfileView';
import { connect } from 'react-redux';
import SupportPortal from './pages/tradersCommunity/supportPortal/SupportPortal';
import SupportPortalsList from './pages/tradersCommunity/supportPortal/SupportPortalsList';
import CreateTicket from './pages/tradersCommunity/supportPortal/CreateTicket';
import EditGroup from './components/tradersCommunity/group/manageGroup/EditGroup';
import GroupSettings from './components/tradersCommunity/group/manageGroup/GroupSettings';
import GroupAvatar from './components/tradersCommunity/group/manageGroup/GroupAvatar';
import GroupCoverImage from './components/tradersCommunity/group/manageGroup/GroupCoverImage';
import ManageGroupMemebers from './components/tradersCommunity/group/manageGroup/ManageGroupMembers';
import DeleteGroup from './components/tradersCommunity/group/manageGroup/DeleteGroup';
import Gallery from './pages/tradersCommunity/groups/group/gallery/Gallery';
import AllGalleries from './components/tradersCommunity/group/gallery/AllGalleries';
import MyGalleries from './components/tradersCommunity/group/gallery/MyGalleries';
import CreateGallery from './components/tradersCommunity/group/gallery/CreateGallery';
import ManageGroup from './components/tradersCommunity/group/manageGroup/ManageGroup';
import LiveMeeting from './pages/tradersCommunity/groups/group/liveMeeting/LiveMeeting';
import NewCourse from './pages/profile/new_course';
import MyCourses from './pages/profile/my_courses/view/my_courses';
import EnrolledCourses from './pages/profile/enrolled_courses/view/enrolled_courses';
import CourseBuilderPage from './pages/profile/new_course_components/CourseBuilderPage';
import CourseMeetingAndPdf from './pages/profile/new_course_components/CourseMeetingAndPdf';
import MarketPulseLayout from './layouts/marke_pulse_layout';
import MarketPulseIndex from './pages/market_pulse';
import { market_pulse_router } from './admin_panel/utils/market_pulse_router';

function App({ auth }) {
  const token = localStorage.getItem('loginToken');
  console.log({ auth });

  // React.useEffect(() => {
  //   if (!token) {
  //     http_instanse
  //       .post(
  //         "/gettoken",
  //         {
  //           username: "yasa",
  //           password: "kashi",
  //         },
  //         { auth: { password: "kashi", username: "yasa" } }
  //       )
  //       .then((res) => {
  //         if (!localStorage?.userid) {
  //           get_user_info_api().then(() => {
  //             window?.location?.reload();
  //           });
  //         } else {
  //           window?.location?.reload();
  //         }
  //         localStorage.loginToken = res.data.messageData;
  //       })
  //       .catch((err) => {});
  //   }
  // }, []);
  // @babel/plugin-proposal-private-property-in-object
  // export NODE_OPTIONS=--max_old_space_size=4096
  // npx update-browserslist-db@latest

  return (
    <div className='bg-blue-dark'>
      {/* <header className="text-center p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold">Welcome to my multilingual app</h1>
        <p className="text-gray-600">This is a simple example</p>
        
      </header> */}
      <div className='max-w-[1500px] mx-auto flex flex-col min-h-screen  overflow-x-hidden'>
        <main className='flex-1'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/market-pulse' element={<MarketPulseLayout />}>
              <Route index element={<MarketPulseIndex />} />
              {market_pulse_router.map((item, i) => {
                return (
                  <Route key={i} path={item.route} element={item.component} />
                );
              })}
            </Route>
            {token ? (
              <>
                <Route path='/partnership' element={<PartnerShip />} />
                <Route
                  path='/partnership/profile-view/:userid'
                  element={<PartnershipProfileView />}
                />
                <Route path='/admin' element={<AdminPage />} />
                <Route path='/course/:id' element={<CourseDetails />} />
                <Route
                  path='/user-profile/myCourses/new-course'
                  element={<NewCourse />}
                />
                <Route
                  path='/user-profile/myCourses/edit-course/:id'
                  element={<NewCourse />}
                />
                <Route
                  path='/user-profile/myCourses/new-course/course-builder/:courseId'
                  element={<CourseBuilderPage />}
                />

                <Route
                  path='/user-profile/myCourses/new-course/add-meeting-pdf/:courseId'
                  element={<CourseMeetingAndPdf />}
                />

                <Route
                  path='/course/attachments/:id/:title'
                  element={<CourseAttachments />}
                />
                <Route path='/learn_to_trade' element={<LearnToTradeScreen />}>
                  <Route
                    path='/learn_to_trade'
                    element={<SelectLearnToTrade />}
                  />

                  <Route
                    path='/learn_to_trade/courses/:level'
                    element={<CategoriesToLearnScreen />}
                  />
                  <Route
                    path='/learn_to_trade/courses/:coursename/:id'
                    element={<CategoriesDetailsView />}
                  />
                </Route>
                <Route path='/admin-panel' element={<MainLayout />}>
                  {admin_panel_router.map((item, i) => {
                    return (
                      <Route
                        key={i}
                        path={item.route}
                        element={item.component}
                      />
                    );
                  })}
                </Route>
                <Route
                  path='/traders-community'
                  element={<TradersCommunity />}
                />
                <Route
                  path='/traders-community/groups'
                  element={<CommunityGroups />}
                />
                {/* <Route
              path="/traders-community/groups/:id"
              element={<CommunityGroup />}
            /> */}
                <Route
                  path='/traders-community/groups/create'
                  element={<CreateGroup />}
                />
                <Route element={<UserProfile />}>
                  <Route
                    path='/user-profile/dashboard'
                    element={<ProfileDashboard />}
                  />
                  <Route path='/user-profile/profile' element={<MyProfile />} />
                  <Route path='/user-profile/groups' element={<MyGroups />} />
                  <Route path='/user-profile/requests' element={<Requests />} />
                  <Route path='/user-profile/signals' element={<MySignals />} />
                  <Route
                    path='/user-profile/enrolled-courses'
                    element={<EnrolledCourses />}
                  />
                  <Route
                    path='/user-profile/order-history'
                    element={<OrderHistory />}
                  />

                  <Route
                    path='/user-profile/myCourses'
                    element={<MyCourses />}
                  />

                  <Route
                    path='/user-profile/withdrawals'
                    element={<Withdrawals />}
                  />

                  {/* SETTINGS */}
                  <Route element={<Settings />}>
                    <Route
                      path='/user-profile/settings'
                      element={<Profile />}
                    />
                    <Route
                      path='/user-profile/settings/reset-password'
                      element={<ResetPassword />}
                    />
                    <Route
                      path='/user-profile/settings/withdraw'
                      element={<Withdraw />}
                    />
                    <Route
                      path='/user-profile/settings/social-profile'
                      element={<SocialProfile />}
                    />
                  </Route>
                </Route>
                {/* <Route path="/user-profile/dashboard" element={<UserProfile />} /> */}
                <Route
                  path='/traders-community/all-membership-request'
                  element={<AllMemberShipRequest />}
                />
                <Route
                  path='/traders-community/create-signal-channel/:id'
                  element={<CreateSignalChannel />}
                />
                <Route
                  path='/traders-community/groups/:name/create-signal'
                  element={<CreateSignal />}
                />
                <Route element={<SupportPortal />}>
                  <Route
                    path='/traders-community/support-portal'
                    element={<SupportPortalsList />}
                  />
                  <Route
                    path='/traders-community/support-portal/ticket/create'
                    element={<CreateTicket />}
                  />
                </Route>

                {/* <Route
                  path="/traders-community/groups/create"
                  element={<CreateGroup />}
                /> */}
                <Route path='/user-profile/*' element={<UserProfile />} />
                <Route
                  path='/traders-community/groups/:name/live-meeting'
                  element={<LiveMeeting />}
                />
                <Route element={<CommunityGroup />}>
                  <Route
                    path='/traders-community/groups/:name'
                    element={<GroupHome />}
                  />

                  {/* MESSAGES */}
                  <Route
                    path='/traders-community/groups/:name/messages'
                    element={<Messages />}
                  />

                  {/*  MEMBERS */}
                  <Route
                    path='/traders-community/groups/:name/members'
                    element={<GroupMembers />}
                  />

                  {/* SIGNAL CHANNEL */}
                  <Route
                    path='/traders-community/groups/:name/signal-channels'
                    element={<SignalChannel />}
                  />

                  {/* SIGNALS LIST */}
                  <Route
                    path='/traders-community/groups/:name/signals-list'
                    element={<SignalsList />}
                  />

                  {/* Manage */}
                  <Route
                    path='/traders-community/groups/:name/admin'
                    element={<ManageGroup />}
                  />

                  <Route element={<ManageGroup />}>
                    <Route
                      path='/traders-community/groups/:name/admin/edit-details'
                      element={<EditGroup />}
                    />
                    <Route
                      path='/traders-community/groups/:name/admin/group-settings'
                      element={<GroupSettings />}
                    />

                    <Route
                      path='/traders-community/groups/:name/admin/group-avatar'
                      element={<GroupAvatar />}
                    />

                    <Route
                      path='/traders-community/groups/:name/admin/group-cover-image'
                      element={<GroupCoverImage />}
                    />

                    <Route
                      path='/traders-community/groups/:name/admin/manage-members'
                      element={<ManageGroupMemebers />}
                    />

                    <Route
                      path='/traders-community/groups/:name/admin/delete-group'
                      element={<DeleteGroup />}
                    />
                  </Route>
                  {/* Gallery */}
                  <Route
                    path='/traders-community/groups/:name/mediapress'
                    element={<Gallery />}
                  />
                  <Route element={<Gallery />}>
                    <Route
                      path='/traders-community/groups/:name/mediapress/all-galleries'
                      element={<AllGalleries />}
                    />

                    <Route
                      path='/traders-community/groups/:name/mediapress/my-gallery'
                      element={<MyGalleries />}
                    />

                    <Route
                      path='/traders-community/groups/:name/mediapress/create'
                      element={<CreateGallery />}
                    />
                  </Route>
                </Route>
                {/* Messages */}
              </>
            ) : (
              <Route path='/login' element={<Login />} />
            )}
          </Routes>
        </main>
        <div />
      </div>
      <MessagesSnackbar />
      <Toaster position='bottom-right' reverseOrder={false} />
    </div>
  );
}
const state = (state) => {
  const { general } = state;
  const { auth } = general;

  return { auth };
};
export default connect(state)(App);
