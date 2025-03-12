// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Bootstrap CSS and Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Option A: Import each CSS file individually
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/forms.css';
import './styles/responsive.css';

// Import custom hooks for authentication
import { useAuthCheck } from './hooks/useAuth';

// Import shared components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Import page components
import Home from './pages/Home';
import Forms from './pages/Forms';
import Reports from './pages/Reports';
import Contact from './pages/Contact';
import Login from './pages/Login';

function App() {
  // Use our custom hook to check authentication state
  const { user, isLoading } = useAuthCheck();

  // Show a loading screen while auth is being determined
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {/* Only show header and sidebar if the user is authenticated */}
        {user && <Header />}
        {user && <Sidebar />}

        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forms" element={user ? <Forms /> : <Login />} />
            <Route path="/reports" element={user ? <Reports /> : <Login />} />
            <Route path="/contact" element={user ? <Contact /> : <Login />} />
          </Routes>
        </div>

        {/* Only show footer if the user is authenticated */}
        {user && <Footer />}
        <Toast />
      </div>
    </Router>
  );
}

export default App;

