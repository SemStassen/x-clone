import { ProfilePicture } from "@/components/General";
import { EditProfileButton } from "@/components/Profile";

interface PageProps {
  params: { username: string };
}

export default async function Page({ params }: PageProps) {
  return (
    <div className="flex  justify-between gap-4 border border-gray-200 p-4">
      <div className="flex gap-4">
        <ProfilePicture
          src="/next.svg"
          alt={`X-clone profile picture of ${params.username}`}
        ></ProfilePicture>
        <h2 className="text-2xl text-white">{params.username}</h2>
      </div>
      <EditProfileButton></EditProfileButton>
    </div>
  );
}
