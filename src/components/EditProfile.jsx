import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const saveProfile = async () => {
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                },
                {withCredentials: true},
            );
            dispatch(addUser(res?.data?.data));
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }


    return(
        <>
            <div className="flex justify-center gap-5">
            <div className="card card-border bg-base-300 w-96 my-5 flex justify-center">
            <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input 
                type="text" 
                className="input" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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

                <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL</legend>
                <input 
                type="text" 
                className="input" 
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="" />
                </fieldset>

                <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input 
                type="text" 
                className="input" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="" />
                </fieldset>

                <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input 
                type="text" 
                className="input" 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="" />
                </fieldset>

                <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input 
                type="text" 
                className="input" 
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="" />
                </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
            </div>
        </div>
            </div>
            <UserCard user={{firstName, lastName, photoUrl, age, gender, about}}/>
            </div>
        </>
    );
};

export default EditProfile;