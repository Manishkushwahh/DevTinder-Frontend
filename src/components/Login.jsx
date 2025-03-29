import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFisrtName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
       try {
        const res = await axios.post(
            BASE_URL + "/login",
            {
                email,
                password,
            },
            {withCredentials: true},
        );
            dispatch(addUser(res.data));
            navigate("/");
       } catch (err) {
            setError(err?.response?.data);
            console.log(err);
       }
    };

    const handleSignUp = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                {
                    firstName,
                    lastName,
                    email,
                    password,
                },
                {withCredentials: true},
            );
            dispatch(addUser(res.data));
            navigate("/profile");
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div className="flex justify-center">
        <div className="card card-border bg-base-300 w-96 my-5">
        <div className="card-body">
            <h2 className="card-title justify-center">{isLoggedIn ? "Login" : "Sign Up"}</h2>
            <div>
            {!isLoggedIn && (
                <>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input 
                type="text" 
                className="input" 
                value={firstName}
                onChange={(e) => setFisrtName(e.target.value)}
                placeholder="" />
                </fieldset>

                <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input 
                type="text" 
                className="input" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="" />
                </fieldset>
                </>
            )}

                <fieldset className="fieldset">
                <legend className="fieldset-legend">Email Id</legend>
                <input 
                type="text" 
                className="input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="" />
                </fieldset>

                <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input 
                type="text" 
                className="input" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="" />
                </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={isLoggedIn ? handleLogin : handleSignUp}>{isLoggedIn ? "Login" : "Sign Up"}</button>
            </div>

            <p className="text-center cursor-pointer" 
            onClick={() => setIsLoggedIn((value) => !value)}>
                {isLoggedIn ? "New User !! Sign-Up Here" : "Existing User ? Login Here"}
            </p>
        </div>
        </div>
        </div>
    );
};

export default Login;