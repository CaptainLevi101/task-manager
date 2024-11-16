import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

export interface taskProps {
  id: string; // Unique identifier for each task
  title: string;
  desc: string;
  date: Date;
  priority: string;
  isCompleted?: boolean; // New field for task completion status
}

const Task = ({ task,onTaskChange }: { task: taskProps,onTaskChange:()=>void }) => {
  const { id, title, desc, date, priority, isCompleted } = task;
  const taskDate = new Date(date);

  // Calculate remaining days
  const remainingDays = Math.ceil((taskDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  // Map priority to a color for better visual distinction
  const priorityColorMap: Record<string, string> = {
    low: 'text-green-500',
    medium: 'text-yellow-500',
    high: 'text-orange-500',
    'very-high': 'text-red-500',
  };

  const priorityColor = priorityColorMap[priority.toLowerCase()] || 'text-gray-500';

  // State for completion status
  const [isTaskCompleted, setIsTaskCompleted] = useState(isCompleted);

  // Function to update task status in local storage
  const updateTaskInLocalStorage = (updatedTask: taskProps) => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = tasks.map((t: taskProps) => (t.id === updatedTask.id ? updatedTask : t));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  

  // Handle status toggle
  const handleStatusToggle = () => {
    const updatedStatus = !isTaskCompleted;
    setIsTaskCompleted(updatedStatus);

    // Update task in local storage
    const updatedTask = { ...task, isCompleted: updatedStatus };
    updateTaskInLocalStorage(updatedTask);
    onTaskChange();
  };


  // Handle task deletion
  const handleDeleteTask = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = tasks.filter((t: taskProps) => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    onTaskChange();
    // Optionally, remove the task from the UI by notifying the parent component
  };

 
  return (
    <div className="flex flex-col bg-card shadow-md rounded-lg p-4 space-y-4">
      <div className="text-lg font-semibold text-primary">{title}</div>
      <div className="text-sm text-muted-foreground">{desc}</div>
      <div className={`text-sm font-medium ${priorityColor}`}>
        Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </div>
      <div className="text-sm font-medium text-secondary">
        {remainingDays >= 0
          ? `${remainingDays + 1} day${remainingDays > 1 ? 's' : ''} remaining`
          : 'Deadline passed'}
      </div>

      <div className="flex items-center justify-between">
        <Button
          className={isTaskCompleted ? 'bg-green-700' : ''}
          variant={isTaskCompleted ? 'default' : 'secondary'}
          type="button"
          onClick={handleStatusToggle}
        >
          {isTaskCompleted ? 'Completed' : 'Mark as Complete'}
        </Button>
        <Button className="" variant="destructive" type="button" onClick={handleDeleteTask}>
          Delete Task
        </Button>
      </div>
    </div>
  );
};

export default Task;
