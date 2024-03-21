import React from 'react'
import JobsPage from '@/app/(recruiter)/(route)/recruiter/[username]/dashboard/[item]/MyJobs'
import Applicants from './Applicants'
const Item = ({params}:{params:{item:string,username:string}}) => {
    const item = params.item
    const username = params.username
    console.log('usernmae',username);
  if(item === 'my-jobs'){
    return (
      <div>
        <JobsPage recruiter={username}/>
      </div>
    )
  }
  if(item === 'applicants'){
    return(
        <Applicants/>
    )
  }
}

export default Item