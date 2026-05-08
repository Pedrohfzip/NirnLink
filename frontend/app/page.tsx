import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  if (!token){
    redirect("/login");
  } else {
    redirect("/home");
  }
}