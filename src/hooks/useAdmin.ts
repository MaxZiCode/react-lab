import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function useAdmin(): boolean {
  const { username } = useSelector((s: RootState) => s.user);
  return username.toLowerCase() === "admin@gmail.com";
}
