import { NewTweetForm } from "@/components/NewTweet";
import { ProfilePicture } from "@/components/General";

export default function NewTweet() {
  return (
    <div className="flex h-min w-full gap-4 border border-gray-200 p-6">
      <ProfilePicture
        src="/next.svg"
        alt="User profile picture"
      ></ProfilePicture>
      <div className=" flex-grow ">
        <NewTweetForm></NewTweetForm>
      </div>
    </div>
  );
}
