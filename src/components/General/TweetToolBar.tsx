import { CommentIcon, HeartIcon } from "@/components/Svg";

export default function TweetToolBar() {
  return (
    <div className="mt-2 flex justify-between">
      <TweetToolBarItem color="yellow">
        <HeartIcon />
      </TweetToolBarItem>
      <TweetToolBarItem color="green">
        <CommentIcon />
      </TweetToolBarItem>
    </div>
  );
}

interface TweetToolBarItemProps {
  children: React.ReactNode;
  color: "yellow" | "green";
}

function TweetToolBarItem({ children, color }: TweetToolBarItemProps) {
  let bgColor;
  let svgColor;

  // define full classnames here so tailwind recognizes them when compiling
  switch (color) {
    case "yellow":
      bgColor = "group-hover:bg-yellow-200";
      svgColor = "group-hover:text-yellow-200";
      break;
    case "green":
      bgColor = "group-hover:bg-green-200";
      svgColor = "group-hover:text-green-200";
      break;
  }

  return (
    <button>
      <div className="group flex items-center gap-2">
        <div
          className={`absolute h-8 w-8 -translate-x-1 rounded-full opacity-20  ${bgColor}`}
        ></div>
        <div className="h-6 w-6 fill-current text-slate-400">{children}</div>
        <span className={`${svgColor}`}>1</span>
      </div>
    </button>
  );
}
