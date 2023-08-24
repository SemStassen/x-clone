import { EditProfileFormData } from "@/components/Profile/EditProfileButton";
import { getRouteSession } from "@/server/lucia";

export default async function PATCH(req: Request) {
  const session = await getRouteSession();
  if (!session) {
    return new Response(null, {
      status: 401,
    });
  }

  const data: EditProfileFormData = await req.json();
  const { username, bio } = data;
  console.log(data);

  const updatedUser = await session.user.update({
    where: {
      id: session.user.id,
    },
    data: {},
  });
}
