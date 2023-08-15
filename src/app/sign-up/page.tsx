"use client";

import { Input } from "@/components/Form";
import { Button } from "@/components/General";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export interface FormDataSignUp {
  username: string;
  password: string;
}

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataSignUp>();

  const onSubmit = async (data: FormDataSignUp) => {
    const response = await fetch("api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "manual",
    });

    if (response.status === 200) {
      router.push("/");
    }
  };

  return (
    <>
      <div className="grid min-h-screen place-items-center">
        <div className=" mx-auto  max-w-lg  rounded-xl border-4 border-slate-400 bg-slate-100 p-8">
          <h1 className="mb-4 text-2xl font-bold">Sign up</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              label="username"
              name="username"
              type="text"
              register={register("username", {
                required: true,
                minLength: 3,
                maxLength: 50,
              })}
            />
            <Input
              label="password"
              name="password"
              type="password"
              register={register("password", {
                required: true,
                minLength: 3,
                maxLength: 50,
              })}
            />
            <Button type="submit" className="w-100">
              Create account
            </Button>
          </form>
          <Link href="/sign-in" className="ms-2 text-sm">
            Already have an account?
          </Link>
        </div>
      </div>
    </>
  );
}
