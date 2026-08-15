import { useEffect, useState } from "react";
import { authApi } from "../../../api/services/auth";
import type { UserProfile } from "../../../api/types";

export default function Main() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authApi.getProfile();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);



  const firstName = user?.nameAndSurname? user.nameAndSurname.split(" ")[0] : "користувач";

  return (
    <div className="mx-auto max-w-7xl px-8 py-8">
      <section className="mb-8">
        <h1 className="text-5xl font-bold text-foreground">
          Привіт, {loading ? "..." : firstName}!
        </h1>

        <p className="mt-2 text-lg text-foreground-secondary">
          Вирушаєо у мандрівку світом знань разом з ReadyFox!
        </p>
      </section>

    </div>
  );
}