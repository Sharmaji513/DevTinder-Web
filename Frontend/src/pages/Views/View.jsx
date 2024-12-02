import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';

const View = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
    {/* Sidebar */}
    <div className="w-full md:w-1/4">
      <Sidebar />
    </div>


    </div>
  )
}

export default View;