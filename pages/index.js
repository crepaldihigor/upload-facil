// pages/index.js
import { useEffect } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

export default function Home() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Usuário logado:', user.email);
      } else {
        console.log('Usuário deslogado');
      }
    });

    return () => unsubscribe(); // limpa ao sair da página
  }, []);

  return (
    <main>
      <h1>Upload Fácil</h1>
      <a href="/login">Login</a>
    </main>
  );
}
