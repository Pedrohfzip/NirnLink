import { cookies } from "next/headers";
import { redirect } from "next/navigation"; 
import LoginForm from "../components/loginForm";
export default async function Page() {
  const token = (await cookies()).get("token")?.value;

  if (token) {
    redirect("/home");
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <LoginForm />
      </main>
    </div>
  );
}
