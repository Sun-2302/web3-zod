"use client"
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
    name: z.string().min(2, "Name should have at least 2 characters").max(50, "Name should not exceed 50 characters."),
    email: z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
    number: z.string().min(10, "Your number should have 10 integer"),
    message: z.string().min(5, "Message should have at least 5 characters")
});

export default function FormContact() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            number: "",
            message: "",
        },
    });

    const onSubmit: SubmitHandler<{ name: string; email: string; number: string; message: string; }> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-20 items-center justify-center w-1/2 px-10 py-10 shadow-lg shadow-[#EDF6F9] ">
            <div className='mx-auto ml-32'>
                <div className="mb-5">
                    <label className="block mb-2">Name</label>
                    <input {...register("name")} className="border rounded-md border-gray-200 focus:border-2 focus:outline-[#83C5BE] px-2 py-1 w-2/3" />
                    {errors.name && <p className="text-red-700">{errors.name.message}</p>}
                </div>

                <div className="mb-5">
                    <label className="block mb-2">Email</label>
                    <input {...register("email")} className="border rounded-md border-gray-200 focus:border-2 focus:outline-[#83C5BE] px-2 py-1 w-2/3" />
                    {errors.email && <p className="text-red-700">{errors.email.message}</p>}
                </div>

                <div className="mb-5">
                    <label className="block mb-2">Phone Number</label>
                    <input type="text" {...register("number")} className="border rounded-md border-gray-200 focus:border-2 focus:outline-[#83C5BE] px-2 py-1 w-2/3" />
                    {errors.number && <p className="text-red-700">{errors.number.message}</p>}
                </div>

                <div className="mb-5">
                    <label className="block mb-2">Message</label>
                    <textarea {...register("message")} className="border rounded-md border-gray-200 focus:border-2 focus:outline-[#83C5BE] px-2 py-1 w-2/3" />
                </div>

                <button type="submit" className="text-white py-2 px-4 rounded-lg bg-[#006D77] ml-28 hover:scale-110">Submit</button>
            </div>
        </form>
    );
}