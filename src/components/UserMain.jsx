import React from 'react';
import SideBar from './Sidebar';
import TaskList from './TaskList';
import ReviewList from './ReviewList';
import Reward from './reward';


function UserMain({onSignoutClick}) {
  // return (
  //   <div className="grid grid-cols-5 h-full w-full">
  //     <div className="col-span-1">
  //       <SideBar onSignoutClick={onSignoutClick}/>
  //     </div>

  //     <div className="col-span-4">
  //       <TaskList />
  //     </div>

  //   </div>
  // );
  return <Reward />
}

export default UserMain;
