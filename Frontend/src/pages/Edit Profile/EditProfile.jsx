import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import ProfileCard from "./ProfileCard";
import { BASE_URL } from "../../utils/constants";

const EditProfile = ({ user }) => {
    const [formData, setFormData] = useState({
        firstName: user?.firstName || user?.data?.firstName || "",
        lastName: user?.lastName || user?.data?.lastName || "",
        photoUrl: user?.photoUrl || user?.data?.photoUrl || "",
        age: user?.age || user?.data?.age || "",
        gender: user?.gender || user?.data?.gender || "",
        about: user?.about || user?.data?.about || "",
        skills: user?.skills || user?.data?.skills || "",
        emailId: user?.emailId || user?.data?.emailId || ""
    });
    
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.patch(
                BASE_URL + "/api/v1/profile/edit",
                formData,
                { withCredentials: true }
            );
            
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (err) {
            setError(err.response?.data || "An error occurred");
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:justify-center items-center md:items-start gap-6 my-4 md:my-24">
                {/* Profile Preview - Top on mobile, side on desktop */}
                <div className="w-full md:w-1/3 lg:w-1/4">
                    <ProfileCard user={formData} />
                </div>
                
                {/* Edit Profile Form */}
                <div className="card bg-base-300 w-full md:w-2/3 lg:w-1/2 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-2xl mb-4">Edit Profile</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    className="input input-bordered"
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    className="input input-bordered"
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="url"
                                    name="photoUrl"
                                    value={formData.photoUrl}
                                    className="input input-bordered"
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Age</span>
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    className="input input-bordered"
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="select select-bordered"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            
                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text">About</span>
                                </label>
                                <textarea
                                    name="about"
                                    value={formData.about}
                                    className="textarea textarea-bordered h-24"
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text">Skills</span>
                                </label>
                                <input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    className="input input-bordered"
                                    onChange={handleChange}
                                    placeholder="Separate skills with commas"
                                />
                            </div>
                            
                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="emailId"
                                    value={formData.emailId}
                                    className="input input-bordered"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                        
                        <div className="card-actions justify-center mt-6">
                            <button 
                                className="btn btn-primary w-full md:w-auto px-8"
                                onClick={saveProfile}
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Toast Notification */}
            {showToast && (
                <div className="toast toast-bottom toast-center mt-10 md:mb-4 z-50 ">
                    <div className="alert alert-success shadow-lg flex justify-between">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                            <div>Profile saved successfully!</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfile;