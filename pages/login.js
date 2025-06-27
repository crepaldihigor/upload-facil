// pages/login.js
import { useState } from 'react';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modoCadastro, setModoCadastro] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleAuth = async (e) => {
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
    <main>
      <h1>{modoCadastro ? 'Criar Conta' : 'Login'}</h1>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{modoCadastro ? 'Criar Conta' : 'Entrar'}</button>
      </form>

      <button onClick={() => setModoCadastro(!modoCadastro)}>
        {modoCadastro ? 'Já tenho conta' : 'Criar nova conta'}
      </button>

      {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}
      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
    </main>
  );
}
