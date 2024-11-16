import { z } from "zod";

export const taskCardSchema=z.object({
    title:z.string().min(5,{
        message:'Title must be atleast 5 characters'
     }),
     desc:z.string().min(12,{
        message:'Description must be atleast 12 characters'
     }),
     priority:z.string(),
     date:z.date()
 })