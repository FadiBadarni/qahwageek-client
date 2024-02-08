import React from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { logout } from 'store/user/userActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.data);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        background: '#f0f0f0',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        Home
      </Link>
      <div>
        {user ? (
          <button onClick={handleLogout} style={{ marginRight: '10px' }}>
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                marginRight: '10px',
                textDecoration: 'none',
                color: 'black',
              }}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
