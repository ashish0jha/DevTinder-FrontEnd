import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router';
import { baseUrl } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { removeFeed } from '../utils/feedSlice';
import { removeConnections } from '../utils/connectionSlice';

const NavBar = () => {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.post(baseUrl + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      navigate("/login")
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="navbar bg-[#11131c] border-b border-zinc-800/80 px-6 h-16 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold tracking-tight text-zinc-100 hover:text-white cursor-pointer transition-colors duration-150">
          DevTinder
        </Link>
      </div>
      {user && <div className="flex items-center gap-4">
        <p className='text-[14px] text-zinc-400 font-normal hidden sm:block'>
          Welcome back, <span className="text-zinc-200 font-medium">{user.lastName}</span>
        </p>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-zinc-800/50 transition-colors duration-150">
            <div className="w-9 rounded-full border border-zinc-700">
              <img
                alt="User"
                src={user?.photoUrl} />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-[#11131c] border border-zinc-800/80 rounded-xl z-10 mt-3 w-48 p-1.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] text-zinc-300">
            <li>
              <Link to="/profile" className="justify-between px-3 py-2 hover:bg-zinc-800 hover:text-zinc-100 rounded-lg transition-colors duration-150 text-[13px]">
                Profile
                <span className="bg-zinc-800 text-zinc-400 text-[10px] font-medium px-1.5 py-0.5 rounded">New</span>
              </Link>
            </li>
            <li>
              <Link to={"/connections"} className="px-3 py-2 hover:bg-zinc-800 hover:text-zinc-100 rounded-lg transition-colors duration-150 text-[13px]">
                Connections
              </Link>
            </li>
            <li>
              <Link to={"/requests"} className="px-3 py-2 hover:bg-zinc-800 hover:text-zinc-100 rounded-lg transition-colors duration-150 text-[13px]">
                Requests
              </Link>
            </li>
            <div className="h-px bg-zinc-800/60 my-1"></div>
            <li>
              <a className="px-3 py-2 hover:bg-red-950/40 hover:text-red-400 text-red-400/90 rounded-lg transition-colors duration-150 text-[13px]" onClick={logoutHandler}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>}
    </div>
  )
}

export default NavBar