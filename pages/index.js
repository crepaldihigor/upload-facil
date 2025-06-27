// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      router.push(user ? '/dashboard' : '/login');
    });
  }, []);
  return <div>Carregando...</div>;
}
