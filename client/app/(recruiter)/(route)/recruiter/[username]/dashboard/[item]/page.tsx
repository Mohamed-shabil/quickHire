import React from 'react'
import JobsPage from '@/app/(recruiter)/(route)/recruiter/[username]/dashboard/[item]/MyJobs'
import Applicants from './Applicants'
const Item = ({params}:{params:{item:string,username:string}}) => {
    const item = params.item
    const username = params.username

}

export default Item