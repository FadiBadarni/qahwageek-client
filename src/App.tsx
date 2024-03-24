import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from 'components/login';
import { ProtectedRoute } from 'ProtectedRoute';
import { Navbar } from 'components/navigation/navbar';
import { Home } from 'components/home';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useEffect } from 'react';
import Footer from 'components/footer';
import CMSPage from 'components/admin/CMSPage';
import Post from 'components/post';
import UserProfile from 'components/user';
import NotFoundPage from 'components/shared/NotFoundPage';
import { RegistrationPage } from 'components/register';
import { ForgotPassword } from 'components/login/ForgotPassword';
import CategoriesManagement from 'components/admin/Categories';
import DynamicCategoryHome from 'components/categories';
import ContactPage from 'components/contact';
import { ResetPassword } from 'components/login/ResetPassword';
import { UsersManagement } from 'components/admin/Users';
import EventsManagerDashboard from 'components/events_manager';
import CreateEvent from 'components/events_manager/EventCreation/CreateEvent';
import EventsPage from 'components/event';
import UsersEventsTable from 'components/events_manager/ReviewEvents';
import EventsManagement from 'components/events_manager/ManageEvents';
import PostsManagement from 'components/admin/posts';
import PostForm from 'components/admin/PostCreation/PostForm';
import AboutPage from 'components/about';
import UnauthorizedPage from 'components/shared/UnauthorizedPage';

function App() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-light-background dark:bg-dark-background text-neutral-600 dark:text-neutral-100 transition duration-300 ease-in-out">
      <Router>
        <Navbar />
        <div className="flex-grow w-full mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/posts/:postId" element={<Post />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/category/:slug" element={<DynamicCategoryHome />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/user/profile/:userId" element={<UserProfile />} />
            <Route
              path="/cms"
              element={
                <ProtectedRoute requiredRoles={['ROLE_ADMIN']}>
                  <CMSPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cms/posts/new"
              element={
                <ProtectedRoute requiredRoles={['ROLE_ADMIN', 'ROLE_WRITER']}>
                  <PostForm mode="create" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cms/posts/edit/:postId"
              element={
                <ProtectedRoute requiredRoles={['ROLE_ADMIN', 'ROLE_WRITER']}>
                  <PostForm mode="edit" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cms/categories"
              element={
                <ProtectedRoute requiredRoles={['ROLE_ADMIN']}>
                  <CategoriesManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cms/posts"
              element={
                <ProtectedRoute requiredRoles={['ROLE_ADMIN']}>
                  <PostsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cms/manage-users"
              element={
                <ProtectedRoute requiredRoles={['ROLE_ADMIN']}>
                  <UsersManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events/cms"
              element={
                <ProtectedRoute
                  requiredRoles={['ROLE_ADMIN', 'ROLE_EVENTS_MANAGER']}
                >
                  <EventsManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events/create-event"
              element={
                <ProtectedRoute
                  requiredRoles={['ROLE_ADMIN', 'ROLE_EVENTS_MANAGER']}
                >
                  <CreateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events/review-requests"
              element={
                <ProtectedRoute
                  requiredRoles={['ROLE_ADMIN', 'ROLE_EVENTS_MANAGER']}
                >
                  <UsersEventsTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events/all"
              element={
                <ProtectedRoute
                  requiredRoles={['ROLE_ADMIN', 'ROLE_EVENTS_MANAGER']}
                >
                  <EventsManagement />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
