import './App.css';
import Auth from './Pages/Auth/Auth';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Chat from './Pages/Chat/Chat';

function App() {
const user = useSelector(
    (state) => state.user
)
  // console.log(user)
const router = createBrowserRouter([
  {
    path: "*",
    exact: true,
    element: <>
    {user.userInfo ? <Home/> : <Auth/>}
    </>
  },
  {
    path: "/home",
    element: <>
    {user.userInfo ? <Home/> : <Auth/>}
    </>,
    exact: true,
  },
  {
    path: "/auth",
    element: <Auth />,
    exact: true
  },
  {
    path: `/profile/:id`,
    element: <> {user ? <Profile/> : <Navigate to="../auth" />} 
    </>
  },
  {
    path: `/chat`,
    element: <> {user ? <Chat/> : <Navigate to="../auth" />} 
    </>
  },
]);
  return (
    <div className="App">
      <div className="blur" style={{top:"-18%", right:"0"}}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <RouterProvider  router={router} />
    </div>
  );
}
export default App;
