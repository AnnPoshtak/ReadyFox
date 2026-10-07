import { authApi } from "@/api/services/auth";
import type { UserProfile } from "@/api/types";
import { useEffect, useState } from "react";

export function useUserProfile(){
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authApi.getProfile();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return{
    user,
    isLoading
  }
}