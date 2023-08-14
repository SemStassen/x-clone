import { NewTweetForm } from "@/components/Tweet";
import { ProfilePicture } from "@/components/General";

export default function NewTweet() {
  return (
    <div className="flex border border-gray-200 p-6 h-min w-full gap-4">
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
