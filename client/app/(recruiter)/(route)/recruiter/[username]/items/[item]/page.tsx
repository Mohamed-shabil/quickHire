import React from 'react'
import JobsPage from '@/components/Recruiter/JobsPage'
import Applicants from './Applicants'
const Item = ({params}:{params:{item:string,username:string}}) => {
    const item = params.item
    const username = params.username
    console.log('usernmae',username);
  if(item === 'myJobs'){
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