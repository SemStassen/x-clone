import { ProfilePicture } from "@/components/General";
import { EditProfileButton } from "@/components/Profile";
import { getUserByHandle } from "@/server/actions";

interface PageProps {
  params: { handle: string };
}

export default async function Page({ params }: PageProps) {
  const user = await getUserByHandle(params.handle);

  return user ? (
    <div className="flex  justify-between gap-4 border border-gray-200 p-4">
      <div className="flex gap-4">
        <ProfilePicture
          src={user.profile?.profilePic ? user.profile.profilePic : "/next.svg"}
          alt={`X-clone profile picture of ${user.profile?.username}`}
        ></ProfilePicture>
        <h2 className="text-2xl text-white">{user.profile?.username}</h2>
        <p className="text-white">{user.profile?.bio}</p>
      </div>
      <EditProfileButton></EditProfileButton>
    </div>
  ) : (
    <h2 className="text-4xl text-white">User not found</h2>
  );
}
