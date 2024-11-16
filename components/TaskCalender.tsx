import { PlusCircle } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const TaskCalender = () => {
  return (
    <>
     <div className="flex flex-col space-y-1.5">
     <div className="inline-flex items-center space-x-2 bg-red-200">
  <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    Set Task Deadline
  </span>
  
</div>
  </div>
    </>
   
  )
}

export default TaskCalender
