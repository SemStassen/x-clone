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
  return (
    <div className="rounded-xl bg-white ar-1 aspect-square flex h-fit w-fit">
      <Image src={src} alt={alt} width={size} height={size}></Image>
    </div>
  );
}
