import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
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

    return(
        <>
        <div className="card card-border bg-base-300 w-96 my-5 flex justify-center">
        <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <div>
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
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
        </div>
        </div>
        </>
    );
};

export default Login;