'use client';
import { useLoginStore } from "../states/loginState";
import { login } from "../api/auth";
export default function LoginForm() {
    const { email, password, setEmail, setPassword } = useLoginStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const  user  = await login({ email, password });
            console.log(user);
            // document.cookie = `token=${token}; path=/;`;
            // window.location.href = '/home';
        } catch (error) {
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Login</h1>
        <input
            type="email"
            placeholder="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
            Login
        </button>
        </form>
    );
}
