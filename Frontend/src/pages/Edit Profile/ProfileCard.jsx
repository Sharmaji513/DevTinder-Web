import React from 'react'


const ProfileCard = ({user}) => {
   
    const {firstName, lastName, photoUrl, age,skills, gender, about ,emailId } = user ||  {};
    console.log(user);
  return (
    <div className="max-w-xs">
    <div className="bg-base-200 shadow-xl rounded-lg py-3 md:w-[20vw]  ">
        <div className="photo-wrapper p-2">
            <img className="w-32 h-32 rounded-full mx-auto" src={photoUrl} alt="img"/>
        </div>
        <div className="p-2">
            <h3 className="text-center text-xl text-white font-medium leading-8">{firstName + " " + lastName}</h3>
            <div className="text-center text-green-500 text-xs font-semibold">
                <p>{about}</p>
            </div>
            <table className="text-xs my-3 mx-2">
                <tbody>
              { skills && (<tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">Skills</td>
                    <td className="px-2 py-2">{skills}</td>
                </tr>)}
                <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">EmailId</td>
                    <td className="px-2 py-2">{emailId}</td>
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

            <div className="text-center my-3">
                <a className="text-xs text-indigo-500 italic hover:underline font-medium">View Profile</a>
            </div>

        </div>
    </div>
    </div>

  )
}

export default ProfileCard