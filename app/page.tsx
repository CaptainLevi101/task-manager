'use client';

import Task, { taskProps } from '@/components/Task';
import TaskCard from '@/components/TaskCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [tasks, setTasks] = useState<taskProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const ta = localStorage.getItem('tasks');
    setTasks(ta ? JSON.parse(ta) : []);
  }, []);


  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.priority.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const refreshTasks = () => {
    const ta = localStorage.getItem('tasks');
    setTasks(ta ? JSON.parse(ta) : []);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
     
      <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mb-6">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <p className="text-sm">Organize and prioritize your tasks effectively.</p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
       
        <div className="col-span-8 flex items-center bg-white rounded-md shadow-md p-2">
          <Link href="/" className="mr-2">
            <Search className="text-gray-400" />
          </Link>
          <Input
            type="text"
            placeholder="Search tasks by title, description, or priority"
            className="border-none focus:ring-0 focus:outline-none w-full"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

      
        <div className="col-span-4 flex justify-end">
          <TaskCard onTaskChange={refreshTasks}/>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task: taskProps, index: number) => (
            <div
              className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow"
              key={index}
            >
              <Task task={task} onTaskChange={refreshTasks}/>
            </div>
          ))
        ) : (
          <div className="col-span-12 text-center mt-4">
            <p className="text-gray-500 text-lg">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
