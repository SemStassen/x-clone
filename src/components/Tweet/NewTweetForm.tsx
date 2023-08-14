"use client";

import { useForm } from "react-hook-form";
import { Button } from "../General";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
      await fetch("/api/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      reset({ content: "" });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className="bg-black text-xl w-full focus-visible:outline-none"
        placeholder="What is happening?"
        {...register("content", { required: true })}
      ></textarea>
      {errors.content && <span>Tell us your tweet first!</span>}
      <Button type="submit" className="ms-auto block">
        Post
      </Button>
    </form>
  );
}
