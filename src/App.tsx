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
import CreatePost from 'components/admin/CreatePost';

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
    <div className="min-h-screen flex flex-col bg-light-100 dark:bg-dark-900 text-neutral-600 dark:text-neutral-100">
      <Router>
        <Navbar />
        <div className="flex-grow w-full mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/posts/:postId" element={<Post />} />
            <Route
              path="/cms"
              element={
                <ProtectedRoute>
                  <CMSPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cms/create-post"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
