import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Link } from 'react-router'; 
import { baseUrl } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { removeAllUsers } from '../utils/feedSlice';
import { removeAllConnections } from '../utils/connectionSlice';
import { useState } from 'react';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await axios.post(baseUrl + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeAllUsers());
      dispatch(removeAllConnections());
      setMobileMenuOpen(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const getNavClass = ({ isActive }) =>
    `px-3 py-1.5 text-md font-medium rounded-lg transition-all flex items-center gap-1.5 ${
      isActive
        ? 'bg-zinc-900 text-white'
        : 'text-zinc-400 hover:text-white hover:bg-gray-900'
    }`;

  const getMobileNavClass = ({ isActive }) =>
    `flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
      isActive
        ? 'bg-zinc-900 text-white'
        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
    }`;

  return (
    <nav className="w-full bg-black border-b border-zinc-900 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="shrink-0">
            <Link to="/" className="text-xl font-bold tracking-tight text-white hover:text-zinc-200 transition-colors">
              DevTinder
            </Link>
          </div>

          {user && (
            <>
              <div className="hidden md:flex items-center gap-1">
                <NavLink to="/" end className={getNavClass}>
                  Feed
                </NavLink>
                
                <NavLink to="/profile" className={getNavClass}>
                  Profile
                  <span className="bg-zinc-800 text-red-300 text-[9px] font-semibold px-1 rounded">New</span>
                </NavLink>
                
                <NavLink to="/connections" className={getNavClass}>
                  Connections
                </NavLink>
                
                <NavLink to="/requests" className={getNavClass}>
                  Requests
                </NavLink>
                
                <NavLink to="/premium" className={getNavClass}>
                  Premium
                </NavLink>
                
                <div className="w-px h-4 bg-zinc-800 mx-2" />

                <div className="relative flex items-center pl-2">
                  <button 
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 focus:outline-hidden group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-800 group-hover:border-zinc-700 transition-all">
                      <img alt="User profile" src={user?.photoUrl} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-all max-w-25 truncate">
                      {user.lastName}
                    </span>
                    <svg className={`w-3 h-3 text-zinc-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {profileDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setProfileDropdownOpen(false)} />
                      
                      <div className="absolute right-0 top-full mt-2 w-44 bg-zinc-950 border border-zinc-900 rounded-xl shadow-2xl p-1.5 z-20 animate-in fade-in slide-in-from-top-1 duration-150">
                        <Link 
                          to="/profile" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
                        >
                          Profile
                          <span className="bg-zinc-800 text-zinc-300 text-[9px] font-semibold px-1 rounded">New</span>
                        </Link>
                        
                        <div className="h-px bg-zinc-900 my-1" />
                        
                        <button 
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logoutHandler();
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-lg transition-colors cursor-pointer"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex md:hidden items-center gap-3">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-zinc-800">
                  <img alt="User mobile avatar" src={user?.photoUrl} className="w-full h-full object-cover" />
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-hidden"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </>
          )}

        </div>
      </div>
      
      {user && mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-900 px-4 pt-2 pb-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
          <NavLink to="/profile" onClick={() => setMobileMenuOpen(false)} className={getMobileNavClass}>
            <span>Profile</span>
            <span className="bg-zinc-800 text-zinc-300 text-[10px] font-semibold px-1.5 py-0.5 rounded">New</span>
          </NavLink>
          
          <NavLink to="/connections" onClick={() => setMobileMenuOpen(false)} className={getMobileNavClass}>
            Connections
          </NavLink>
          
          <NavLink to="/requests" onClick={() => setMobileMenuOpen(false)} className={getMobileNavClass}>
            Requests
          </NavLink>
          
          <NavLink to="/premium" onClick={() => setMobileMenuOpen(false)} className={getMobileNavClass}>
            Premium
          </NavLink>
          
          <div className="h-px bg-zinc-900 my-2" />
          
          <button 
            onClick={logoutHandler}
            className="w-full text-left px-3 py-2.5 text-sm font-medium text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-950/20 transition-all cursor-pointer"
          >
            Logout ({user.lastName})
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;