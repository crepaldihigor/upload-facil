// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch {
      alert('Erro ao fazer login.');
    }
  };

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch {
      alert('Erro ao criar conta.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login ou Cadastro</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={login}>Entrar</button>
      <button onClick={signup}>Cadastrar</button>
    </div>
  );
}
