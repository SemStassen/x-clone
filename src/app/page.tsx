import { NewTweet } from "@/components/Tweet";

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto flex">
      <header>
        <div className="w-[400px]">NavBar</div>
      </header>
      <main className="flex w-full">
        <div className="flex-grow">
          <NewTweet></NewTweet>
          <Tweets></Tweets>
        </div>
        <div className="w-[400px]">Trending Tab</div>
      </main>
    </div>
  );
}
