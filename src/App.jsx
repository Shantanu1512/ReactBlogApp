import { useEffect, useState } from 'react';
import './App.css';
import conf from './conf/conf.js';
import authService from './services/appwrite/auth.js';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice.js';
import { Footer, Header } from './components/index.js';
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrenctUser()
      .then((response) => {
        if (response) {
          dispatch(login({ response }));
        } else {
          dispatch(logout());
        }
      })
      .finally(setLoading(false));
  }, []);
  console.log(conf.appwriteUrl);

  return !loading ? (
    <div className="h-screen w-screen text-center content-between bg-gray-500">
      <div className="w-full block">
        <Header />
        <Footer />
      </div>
    </div>
  ) : (
    <div>Loading ....</div>
  );
}

export default App;
