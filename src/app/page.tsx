import { Button } from "@/components/General";
import { NewTweet } from "@/components/NewTweet";
import { getTweetsByAmount } from "@/server/actions";
import { TopBar, Tweets } from "@/components/Ui";
import { getPageSession } from "@/server/lucia";
import Link from "next/link";

export default async function Home() {
  const session = await getPageSession();

  const tweets = await getTweetsByAmount(session, 10);

  return (
    <>
      <TopBar>Home</TopBar>
      {session ? (
        <NewTweet />
      ) : (
        <div className="border border-white p-4">
          <p className="text-md mb-2 text-white">Want to tweet?</p>
          <Button>
            <Link href="/sign-up">Create a new account</Link>
          </Button>
          <span className="mx-4 text-slate-50">or</span>
          <Button>
            <Link href="/sign-in">log into an existing account</Link>
          </Button>
        </div>
      )}
      <Tweets tweets={tweets} />
    </>
  );
}
