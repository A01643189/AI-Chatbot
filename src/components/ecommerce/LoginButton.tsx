import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  return session ? (
    <button onClick={() => signOut()} className="text-sm underline">
      Sign out
    </button>
  ) : (
    <button onClick={() => signIn("google")} className="text-sm underline">
      Sign in with Google
    </button>
  );
}
