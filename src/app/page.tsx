import { Button } from "@/components/General";
import { NewTweet } from "@/components/NewTweet";
import { Tweets } from "@/components/Ui";
import { getTweetsByAmount } from "@/server/actions";
import { getPageSession } from "@/server/lucia";
import Link from "next/link";

export default async function Home() {
  const session = await getPageSession();

  const tweets = await getTweetsByAmount(session, 10);

  return (
    <>
      {session ? (
        <NewTweet />
      ) : (
        <>
          <Button>
            <Link href="/sign-up">Create a new account</Link>
          </Button>
          <span className="mx-4 text-slate-50">or</span>
          <Button>
            <Link href="/sign-in">log into an existing account</Link>
          </Button>
        </>
      )}
      <Tweets tweets={tweets} />
    </>
  );
}
