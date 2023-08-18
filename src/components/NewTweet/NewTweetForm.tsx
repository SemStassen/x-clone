"use client";

import { useForm } from "react-hook-form";
import { Button } from "../General";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface FormData {
  content: string;
}

export default function NewTweetForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await fetch("/api/tweet/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      reset();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-white">
      <textarea
        className="w-full bg-black text-xl focus-visible:outline-none"
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
