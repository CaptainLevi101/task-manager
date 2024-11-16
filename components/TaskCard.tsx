'use client';
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useState } from "react";
import TaskCalender from "./TaskCalender";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { taskCardSchema } from "@/schema/taskCardSchema";
import { zodResolver } from "@hookform/resolvers/zod";


const TaskCard = ({ onTaskChange }: { onTaskChange: () => void }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [done, setDone] = useState(false);
    const toggleOpen = () => {
        setOpen((prev) => !prev);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="hover:bg-slate-500
                 hover:text-yellow-100 flex
                  border-separate items-center 
                  justify-start text-muted-foreground"
                    variant={"ghost"}
                    type="button"
                    onClick={() => toggleOpen()}>
                    <PlusCircle />
                    <span>Add Task</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a New Task</DialogTitle>
                    <DialogDescription>
                        Create Task with a deadline and priority
                    </DialogDescription>
                </DialogHeader>
                <CardForm setOpen={toggleOpen} onTaskChange={onTaskChange} />
            </DialogContent>
        </Dialog>
    )
}




export default TaskCard


const CardForm = ({ setOpen, onTaskChange }: { setOpen: () => void, onTaskChange:()=>void }) => {
    const [openCalender, setOpenCalender] = useState(false);

    const form = useForm<z.infer<typeof taskCardSchema>>({
        resolver: zodResolver(taskCardSchema),
        defaultValues: {
            title: '',
            desc: '',
            priority: '',
            date: new Date(),
        },
    });

    const onSubmit = (data: z.infer<typeof taskCardSchema>) => {
        setOpen();
        const taskWithId = { ...data, id: uuidv4() };
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskWithId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        onTaskChange();

    };

    return (
        <Card className="w-full">
            <CardContent>
                <Form {...form}>
                    <form className="grid w-full items-center gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="flex flex-col space-y-1.5">
                                    <FormLabel htmlFor="name">Name</FormLabel>
                                    <Input id="name" placeholder="Name of your project" {...field} />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="desc"
                            render={({ field }) => (
                                <FormItem className="flex flex-col space-y-1.5">
                                    <FormLabel htmlFor="desc">Description</FormLabel>
                                    <Input id="desc" placeholder="Enter task description" {...field} />
                                    <FormMessage>{form.formState.errors.title?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem className="flex flex-col space-y-1.5">
                                    <FormLabel htmlFor="framework">Select Priority</FormLabel>
                                    <Select
                                        onValueChange={field.onChange} // Bind the select value to form field
                                        value={field.value} // Use form field value
                                    >
                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="very-high">Very High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col space-y-1.5">
                                    <Button type="button" variant="ghost" onClick={() => setOpenCalender(!openCalender)}>
                                        Select Deadline for the task
                                    </Button>
                                    {openCalender && (
                                        <DatePicker
                                            selected={field.value} // Bind value to form field
                                            onChange={(date) => field.onChange(date)} // Update form field on change
                                            dateFormat="dd/MM/yyyy"
                                        />
                                    )}
                                </FormItem>
                            )}
                        />
                        <CardFooter className="flex justify-between">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit">Add Task</Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
