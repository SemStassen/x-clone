import Link from "next/link";

interface NavBarProps {
  session: any;
}

export default async function NavBar({ session }: NavBarProps) {
  return (
    <nav className="w-[300px]">
      <ul className=" flex flex-col gap-2 p-4 text-white">
        <NavBarItem route="/">Home</NavBarItem>
        <NavBarItem
          route={session ? `/profile/${session.user.handle}` : `/sign-up`}
        >
          profile
        </NavBarItem>
      </ul>
    </nav>
  );
}

interface NavBarItemprops {
  children: React.ReactNode;
  route: string;
}

function NavBarItem({ children, route }: NavBarItemprops) {
  return (
    <li>
      <Link href={route}>
        <div className="rounded-md border border-transparent p-2 hover:border-slate-200 ">
          {children}
        </div>
      </Link>
    </li>
  );
}
