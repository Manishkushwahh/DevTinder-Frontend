import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const getConnection = async () => {
        try {
            const res = await axios.get(
                BASE_URL + "/user/connections",
                {withCredentials: true},
            );
            console.log(res.data.data);
            dispatch(addConnection(res.data.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getConnection();
    }, []);

    if(!connections) return;

    if(connections.length === 0) return <h1 className="font-bold text-2xl text-center mt-10">No Connection Found</h1>

    return(
        <div> 
            <h1 className="text-center font-bold text-2xl my-5">Connections</h1>

            {connections.map((connection) => {
                const {_id, firstName, lastName, photoUrl, about, age, gender} = connection;
                return(
                    <div key={_id} className="flex justify-center items-center my-5"> 
                        <div className="flex bg-base-300 shadow-sm w-1/3 items-center ">
                        <div>
                            <img className="w-20 rounded-full" 
                            alt="image" src={photoUrl}></img>
                        </div>
                        <div className="mx-5">
                            <h1>{firstName + " " + lastName}</h1>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                    <Link to={"/chat/" + _id}><button className=" btn btn-secondary">Chat</button></Link>
                    </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Connections;