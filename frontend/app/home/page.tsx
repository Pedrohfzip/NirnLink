import { redirect } from "next/dist/client/components/navigation";
import { cookies } from "next/dist/server/request/cookies";

export default async function Home() {

  const token = (await cookies()).get("token")?.value;

  if (!token) redirect("/");

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w flex-col items-center justify-between py-10 px-10 bg-white dark:bg-black sm:items-start">
        <h1>Home</h1>
      </main>
    </div>
  );
}
