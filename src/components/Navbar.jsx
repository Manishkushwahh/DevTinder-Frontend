import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleLogout = async () => {
      axios.post(
        BASE_URL + "/logout",
        {},
        {withCredentials: true},
      );
      dispatch(removeUser());
      navigate("/login");
    }
    
    return (
        <>
          <div className="navbar bg-base-300 shadow-sm">
          <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">🧑‍💻 DevTinder</Link>
          </div>
          {user && (
          <div className="flex gap-2">
          <div className="dropdown dropdown-end">
          {"Wellcome, " + user.firstName}
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-5">
          <div className="w-9 rounded-full bg-white">
          <img
            alt="user image"
            src={user.photoUrl} />
          </div>
          </div>
          <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
          </li>
          <li>
          <Link to="/connections" className="justify-between">
            Friends
          </Link>
          </li>
          <li>
          <Link to="/requests" className="justify-between">
            Requests
          </Link>
          </li>
          <li>
          <Link to="/" className="justify-between">
            Feed
          </Link>
          </li>
          <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
          </div>
          </div>)}
          </div>
        </>
    );
};

export default Navbar;