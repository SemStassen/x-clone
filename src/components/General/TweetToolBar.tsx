"use client";

import { CommentIcon, HeartIcon } from "@/components/Svg";
import { Tweet } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface TweetToolBarProps {
  likes: number;
  isLiked: boolean;
  id: Tweet["id"];
}

interface updateLikesProps {
  id: Tweet["id"];
}

export default function TweetToolBar({
  id,
  likes,
  isLiked,
}: TweetToolBarProps) {
  const router = useRouter();
  const [likesState, setLikes] = useState(likes);
  const [isLikedState, setIsLiked] = useState(isLiked);

  const updateLikes = async ({ id }: updateLikesProps) => {
    try {
      isLikedState ? setLikes(likesState - 1) : setLikes(likesState + 1);
      setIsLiked(!isLikedState);

      const response = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
      if (response.status == 401) {
        router.push("/sign-up");
      } else if (response.status == 500) {
        toast.error("Oops, something went wrong.");
        setLikes(likesState);
        setIsLiked(isLikedState);
      }
      // router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="mt-2 flex justify-between">
      <TweetToolBarItem
        icon={<HeartIcon />}
        textColor={"group-hover:text-yellow-200"}
        bgColor={"group-hover:bg-yellow-200"}
        metaCount={likesState}
        onClick={() => updateLikes({ id })}
        status={isLikedState}
      ></TweetToolBarItem>
      <TweetToolBarItem
        icon={<CommentIcon />}
        textColor={"group-hover:text-green-200"}
        bgColor={"group-hover:bg-green-200"}
        onClick={() => null}
        metaCount={0}
      ></TweetToolBarItem>
    </div>
  );
}

interface TweetToolBarItemProps {
  icon: JSX.Element;
  textColor: string;
  bgColor: string;
  status?: boolean;
  onClick: () => void;
  metaCount: number;
}

function TweetToolBarItem({
  icon,
  textColor,
  bgColor,
  status,
  onClick,
  metaCount,
}: TweetToolBarItemProps) {
  let iconActive = "";

  if (status) {
    iconActive = "text-red-500";
  }

  return (
    <button>
      <div className="group flex items-center gap-2" onClick={onClick}>
        <div
          className={`absolute h-8 w-8 -translate-x-1 rounded-full opacity-20  ${bgColor}`}
        ></div>
        <div className={`h-6 w-6 fill-current text-slate-400 ${iconActive}`}>
          {icon}
        </div>
        <span className={textColor}>{metaCount ? metaCount : 0}</span>
      </div>
    </button>
  );
}
