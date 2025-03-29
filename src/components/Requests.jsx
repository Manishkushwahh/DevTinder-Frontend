import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {addRequest, removeUserFromRequest} from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request);

    const getRequest = async () => {
        try {
            const res = await axios.get(
                BASE_URL + "/user/requests/received",
                {withCredentials: true},
            );
            dispatch(addRequest(res.data.data));
        } catch (error) {
            console.log(error);
        }
    }

    const handleReceivedtRequest = async (status, userId) => {
       try {
        const res = await axios.post(
            BASE_URL + "/request/received/" + status + "/" + userId,
            {},
            {withCredentials: true},
        );
        dispatch(removeUserFromRequest(userId));
       } catch (err) {
        console.log(err);
       }
    }

    useEffect(() => {
        getRequest();
    }, []);

    if(!requests) return;

    if(requests.length === 0) return <h1 className="font-bold text-2xl text-center mt-10">No Request Found</h1>

    return(
        <div>
            <h1 className="text-center font-bold text-2xl my-5">Connection Requests</h1>

            {requests.map((req) => {
                const {firstName, lastName, photoUrl, about, age, gender} = req.fromUserId;
                const {_id} = req;
                return(
                    <div key={_id} className="flex justify-center items-center my-5"> 
                        <div className="flex bg-base-300 shadow-sm w-1/3 items-center">
                        <div className="ml-2">
                            <img className="w-20 rounded-full" 
                            alt="image" src={photoUrl}></img>
                        </div>
                        <div className="mx-5">
                            <h1>{firstName + " " + lastName}</h1>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div className="flex gap-2 my-5 mx-5 justify-center">
                        <button className="btn btn-primary" onClick={() => handleReceivedtRequest("accepted", _id)}>Accept</button>
                        <button className="btn btn-secondary" onClick={() => handleReceivedtRequest("rejected", _id)}>Reject</button>
                        </div>
                    </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Requests;