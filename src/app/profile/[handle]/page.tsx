import { ProfilePicture } from "@/components/General";
import { EditProfileButton } from "@/components/Profile";
import { prisma } from "@/server/prisma";

interface PageProps {
  params: { handle: string };
}

export default async function Page({ params }: PageProps) {
  const user = await prisma.user.findUnique({
    where: {
      handle: params.handle,
    },
    include: {
      profile: true,
    },
  });

  return user ? (
    <div className="flex  justify-between gap-4 border border-gray-200 p-4">
      <div className="flex gap-4">
        <ProfilePicture
          src="/next.svg"
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
