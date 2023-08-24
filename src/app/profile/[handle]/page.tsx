import { ProfilePicture } from "@/components/General";
import { EditProfileButton } from "@/components/Profile";
import { getUserByHandle } from "@/server/actions";

interface PageProps {
  params: { handle: string };
}

export default async function Page({ params }: PageProps) {
  const user = await getUserByHandle(params.handle);

  return user ? (
    <div className="items-top border-gray flex items-start justify-between border p-4">
      <div>
        <div className="mb-4 flex gap-4">
          <ProfilePicture
            src="/next.svg"
            alt={`X-clone profile picture of ${user.profile?.username}`}
          ></ProfilePicture>
          <div className="flex flex-col">
            <h2 className="text-2xl text-white">{user.profile?.username}</h2>
            <small className="text-xs text-slate-400">@{user.handle}</small>
          </div>
        </div>
        <p className="text-white">{user.profile?.bio}</p>
      </div>
      <EditProfileButton></EditProfileButton>
    </div>
  ) : (
    <h2 className="text-4xl text-white">User not found</h2>
  );
}
