import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useState } from "react";

const UserCard = ({user}) => {
    const {_id, firstName, lastName, age, gender, about, photoUrl} = user;
    const dispatch = useDispatch();
    const handleSendRequest = async (status , userId) => {
        try {
            const res = await axios.post(
                BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                {withCredentials: true},
            );
            dispatch(removeUserFromFeed(userId));
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <>
            <div className="card bg-base-300 w-96 shadow-sm my-5">
            <div className="flex justify-center mt-2">
            <figure className=" w-60 h-60">
                <img
                src={photoUrl}
                alt="photo" />
            </figure>
            </div>
            <div className="card-body items-center">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", "+ gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-5">
                <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                </div>
            </div>
            </div>
        </>
    );
};

export default UserCard;