import NoUserLogged from "@/app/components/NoUserLogged";
import { UserContext } from "@/app/context/UserContext";
import { useContext } from "react";

export default function Profile() {
  const { user } = useContext(UserContext);
  if (!user) return <NoUserLogged />;

  return (
    <div className="my-4 flex w-full flex-row items-center justify-center text-4xl text-white">
      Profile
    </div>
  );
}
