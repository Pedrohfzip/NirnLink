'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          router.push('/home');
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <style>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .loader-spinner {
          animation: spin 1.5s linear infinite;
        }
        .loader-text {
          font-family: 'Cinzel', serif;
          color: #c9a84c;
          font-size: 14px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="loader-container">
        <Loader size={48} color="#c9a84c" className="loader-spinner" />
        <p className="loader-text">Verificando acesso...</p>
      </div>
    </div>
  );
}
