// pages/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (!user) {
    return <p style={{ padding: 20 }}>Carregando...</p>;
  }

  return (
    <main style={styles.container}>
      <h1>🎬 Bem-vindo ao Upload Fácil</h1>
      <p>Você está logado como: <strong>{user.email}</strong></p>

      <button onClick={handleLogout} style={styles.logout}>
        Sair
      </button>
    </main>
  );
}

const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  logout: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1
