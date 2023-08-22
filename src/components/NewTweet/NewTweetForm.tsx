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
  const maxCharacters = 140;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
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

  const characters = watch("content", "");
  useEffect(() => {
    if (characters.length > maxCharacters) {
      setValue("content", characters.slice(0, maxCharacters));
    }
  }, [characters, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-white">
      <textarea
        className="w-full bg-black text-xl focus-visible:outline-none"
        placeholder="What is happening?"
        {...register("content", {
          required: true,
          maxLength: {
            value: maxCharacters,
            message: `Max length is ${maxCharacters}`,
          },
        })}
      ></textarea>
      {errors.content ? errors.content.message : null}
      <div className="mt-2 flex items-center">
        <div>
          <span>
            {characters.length} / {maxCharacters}
          </span>
        </div>
        <Button type="submit" className="ms-auto block">
          Post
        </Button>
      </div>
    </form>
  );
}
