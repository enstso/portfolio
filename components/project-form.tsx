"use client";
import {z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postData, urls } from "@/lib/utils";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const projectFormSchema =  z.object({
    name: z
    .string()
    .min(2, {message:"Name must be at least 2 characters long."})
    .max(30,{message:"Name must not exceed 30 characters."}),
    description: z
    .string()
    .min(2, {message:"Name must be at least 2 characters long."})
    .max(500,{message:"Name must not exceed 500 characters."}),
    url: z
    .string()
    .min(2, {message:"Url must be at least 2 characters long."})
    .max(100,{message:"Url must not exceed 100 characters."}),
    date: z
    .date(),
    categoryId: z
    .number()
    .positive()
})

type projectFormValues = z.infer<typeof projectFormSchema>;

const defaultValues: Partial<projectFormValues> = {
    name:"",
    description:"",
    url:"",
    date:new Date(),
    categoryId:1
}

export function ProjectForm(){
    const [itemSelected, setItemSelected] = useState("");
    
    
}