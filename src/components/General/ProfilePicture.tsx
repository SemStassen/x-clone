import Image from "next/image";

interface ProfilePictureProps {
  src: string;
  alt: string;
  size?: number;
}

export default function ProfilePicture({
  src,
  alt,
  size = 50,
}: ProfilePictureProps) {
  let useImage: boolean;

  RegExp(/https?:\/\/.+/).test(src) ? (useImage = false) : (useImage = true);

  return (
    <div className="ar-1 flex aspect-square h-fit w-fit rounded-xl bg-white">
      {useImage ? (
        <Image src={src} alt={alt} width={size} height={size}></Image>
      ) : (
        <img src={src} alt={alt} width={size} height={size}></img>
      )}
    </div>
  );
}
