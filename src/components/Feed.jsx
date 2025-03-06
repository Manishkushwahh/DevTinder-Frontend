import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

    const getFeed = async () => {
        if(feed){
            return;
        }
        try {
            const res = await axios.get(
                BASE_URL + "/feed",
                {withCredentials: true},
            );
            dispatch(addFeed(res?.data));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getFeed();
    }, []);

    return feed && (
        <div className="flex justify-center my-5 ">
            <UserCard user={feed[2]} />
        </div>
    );
};

export default Feed;