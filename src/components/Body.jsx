import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        if(userData){
            return;
        }
        try {
            const res = await axios.get(
                BASE_URL + "/profile/view",
                {withCredentials: true},
            );
            dispatch(addUser(res.data));
        } catch (err) {
            if(err.status === 401){
                navigate("/login");
            }
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return(
        <div className="flex flex-col min-h-screen">
        <Navbar />
        <Outlet />
        <Footer />
        </div>
    );
};

export default Body;