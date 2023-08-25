"use client";

import { useState } from "react";
import { Button } from "../General";
import { Input, TextArea } from "../Form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export interface EditProfileFormData {
  username?: string;
  profilePic?: string;
  bio?: string;
}

export default function EditProfileButton() {
  const router = useRouter();
  const [editProfile, setEditProfile] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>();

  const onSubmit = async (data: EditProfileFormData) => {
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      router.refresh();
    }
  };

  return (
    <>
      <Button onClick={() => setEditProfile(true)}>Edit profile</Button>
      {editProfile && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4">
          <h2>Edit profile</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Username"
              name="username"
              type="text"
              register={register("username", {
                minLength: 3,
                maxLength: 20,
              })}
            />
            <Input
              label="Profile picture URL"
              name="profilePic"
              type="text"
              register={register("profilePic", {
                pattern: /[https?://.+]/,
              })}
            />
            <TextArea
              label="Bio"
              name="bio"
              register={register("bio", {
                maxLength: 255,
              })}
              className="w-full"
            />
            <Button>Save</Button>
          </form>
        </div>
      )}
    </>
  );
}
