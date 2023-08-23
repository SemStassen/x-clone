export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  return <h1 className="text-slate-200">{params.username}</h1>;
}
