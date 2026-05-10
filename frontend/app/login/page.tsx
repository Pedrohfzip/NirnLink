import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginPage from '@/components/LoginPage'; // seu componente client

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  
  if (token) redirect("/home"); // já logado → manda pro home

  return <LoginPage />; // não logado → mostra o formulário
}