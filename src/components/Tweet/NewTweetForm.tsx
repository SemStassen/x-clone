"use client";

import { useForm } from "react-hook-form";
import { Button } from "../General";
import toast from "react-hot-toast";

interface FormData {
  content: string;
}

export default function NewTweetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await fetch("/api/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-white">
      <textarea
        className="bg-black text-xl w-full focus-visible:outline-none"
        placeholder="What is happening?"
        {...register("content", { required: true })}
      ></textarea>
      {errors.content && toast.error("Tell us your tweet first")}
      <Button type="submit" className="ms-auto block">
        Post
      </Button>
    </form>
  );
}
