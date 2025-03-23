import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function useLogout() {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("token");

    router.push("/");

    window.location.reload();
  };

  return { logout };
}
