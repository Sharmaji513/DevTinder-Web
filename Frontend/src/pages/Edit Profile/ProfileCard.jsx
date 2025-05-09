import React from 'react'

const ProfileCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, skills, gender, about, emailId } = user || {};
    
    return (
        <div className="w-full md:max-w-xs ">
            <div className="bg-base-200 shadow-xl rounded-lg py-3 w-full md:w-full">
                <div className="photo-wrapper p-2">
                    <img 
                        className="w-32 h-32 rounded-full mx-auto object-cover" 
                        src={photoUrl || '/default-profile.png'} 
                        alt="Profile"
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = '/default-profile.png'
                        }}
                    />
                </div>
                <div className="p-2">
                    <h3 className="text-center text-xl text-white font-medium leading-8">
                        {firstName} {lastName}
                    </h3>
                    {about && (
                        <div className="text-center text-green-500 text-xs font-semibold">
                            <p>{about}</p>
                        </div>
                    )}
                    <table className="text-xs my-3 mx-2 w-full">
                        <tbody>
                            {skills && (
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">Skills</td>
                                    <td className="px-2 py-2">{skills}</td>
                                </tr>
                            )}
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                <td className="px-2 py-2 break-all">{emailId}</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Gender</td>
                                <td className="px-2 py-2">{gender}</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Age</td>
                                <td className="px-2 py-2">{age}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;