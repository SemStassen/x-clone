import { getPageSession } from "@/server/lucia";
import { useRouter } from "next/navigation";

export default async function Page() {
  const session = await getPageSession();

  return <h1 className="text-slate-200">{session.user.username}</h1>;
}
