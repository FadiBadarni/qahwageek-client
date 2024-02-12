import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from 'components/login';
import { ProtectedRoute } from 'ProtectedRoute';
import { Navbar } from 'components/navigation/navbar';
import { Home } from 'components/home';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-900">
      <Router>
        <Navbar />
        <div className="flex-grow ">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
