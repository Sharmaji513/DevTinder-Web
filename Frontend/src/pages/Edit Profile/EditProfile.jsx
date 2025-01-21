import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

import ProfileCard from "./ProfileCard";
import { BASE_URL } from "../../utils/constants";
const EditProfile = ({ user }) => {

  const [firstName, setFirstName] = useState(user?.firstName || user?.data.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || user?.data.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || user?.data.photoUrl || "");
  const [age, setAge] = useState(user?.age || user?.data.age || "");
  const [gender, setGender] = useState(user?.gender || user?.data.gender || "");
  const [about, setAbout] = useState(user?.about || user?.data.about || "");
  const [skills, setSkills] = useState(user?.skills|| user?.data.skills || "");
  const [emailId, setEmailId] = useState(user?.emailId|| user?.data.emailId || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/api/v1/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
          emailId,
        },
        { withCredentials: true }
      );
      console.log(res);
      
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="relative flex justify-center my-24 ml-[80%] ">
        {/* Edit Profile Form */}
        <div className="card bg-base-300 md:w-[40vw] w-full shadow-xl mx-10">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <label className="form-control w-full my-2">
                <div className="label">
                  <span className="label-text">First Name:</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered md:w-[35vw]"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full my-2">
                <div className="label">
                  <span className="label-text">Last Name:</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered md:w-[35vw]"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="form-control w-full my-2">
                <div className="label">
                  <span className="label-text">Photo URL:</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered md:w-[35vw]"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
              <label className="form-control w-full my-2">
                <div className="label">
                  <span className="label-text">Age:</span>
                </div>
                <input
                  type="number"
                  value={age}
                  className="input input-bordered md:w-[35vw]"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="form-control w-full my-2">
                <div className="label">
                  <span className="label-text">Gender:</span>
                </div>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input input-bordered md:w-[35vw]"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="form-control w-full my-2">
                <div className="label">
                  <span className="label-text">About:</span>
                </div>
                <input
                  type="text"
                  value={about}
                  className="input input-bordered md:w-[35vw]"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
              <label className="form-control w-full my-2">
                <div className="label">
                  <span className="label-text">Skills:</span>
                </div>
                <input
                  type="text"
                  value={skills}
                  className="input input-bordered md:w-[35vw]"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </label>
              <label className="form-control w-full my-2">
                <div className="label">
                  <span className="label-text">Email ID:</span>
                </div>
                <input
                  type="email"
                  value={emailId}
                  className="input input-bordered md:w-[35vw]"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center m-2">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
        {/* Profile Preview */}
        <ProfileCard user={{
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills,
            emailId,
          }}
        />
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center z-10">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
