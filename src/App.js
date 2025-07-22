import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import MedicineForm from './components/MedicineForm';
import MedicineList from './components/MedicineList';
import './App.css'

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [showLogin, setShowLogin] = useState(true); 

  const logout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (!confirmLogout) return;

    localStorage.removeItem('user');
    setUser(null);
    setShowLogin(true); 
  };
   
  return (
    <div className='black-container-fluid'>
      <nav style={{ padding: '10px', background: '#eee' }}>
        <h2 style={{ display: 'inline-block', marginRight: '20px' }}>RAKSHA PHARMA</h2>
        {user && <button onClick={logout} className='btn btn-info float-right'>Logout</button>}
      </nav>

      {!user ? (
        <div style={{  marginTop: '40px' }}>
          {showLogin ? (
            <>
              <Login setUser={setUser} />
              <p className='red'>
                Don't have an account?{' '}
                <button onClick={() => setShowLogin(false)} className='btn-sm btn-info'>Signup</button>
              </p>
            </>
          ) : (
            <>
              <Signup onSignupSuccess={() => setShowLogin(true)} />
              <p className='red'>
                Already have an account?{' '}
                <button onClick={() => setShowLogin(true)} className='btn-sm btn-info'>Login</button>
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          <h4 style={{ margin: '10px' }}>Welcome, {user.username}</h4><br></br>
          <MedicineForm user={user.username} />
          <MedicineList user={user.username} />
        </>
      )}
    </div>
  );
}

export default App;