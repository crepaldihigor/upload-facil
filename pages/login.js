// pages/login.js
import { useState } from 'react';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modoCadastro, setModoCadastro] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    try {
      if (modoCadastro) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setMensagem(`Conta criada: ${userCredential.user.email}`);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setMensagem(`Login bem-sucedido: ${userCredential.user.email}`);
      }
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <main style={{ padding: '20px' }}>
      <h1>{modoCadastro ? 'Criar Conta' : 'Login'}</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <button type="submit">
          {modoCadastro ? 'Criar Conta' : 'Entrar'}
        </button>
      </form>

      <button onClick={() => setModoCadastro(!modoCadastro)} style={{ marginTop: '10px' }}>
        {modoCadastro ? 'Já tenho uma conta' : 'Criar nova conta'}
      </button>

      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}
    </main>
  );
}
