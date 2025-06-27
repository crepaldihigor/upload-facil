// pages/dashboard.js
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { signOut } from 'firebase/auth';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const q = query(collection(db, 'videos'), where('uid', '==', user.uid));
        onSnapshot(q, (snapshot) => {
          const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setVideos(list);
        });
      } else {
        router.push('/login');
      }
    });
    return () => unsub();
  }, []);

  const simulateUpload = async () => {
    if (!title || !description) return alert('Preencha os campos');
    await addDoc(collection(db, 'videos'), {
      title,
      description,
      uid: user.uid,
      createdAt: new Date(),
    });
    setTitle('');
    setDescription('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Bem-vindo, {user?.email}</h2>
      <button onClick={() => signOut(auth).then(() => router.push('/login'))}>Sair</button>
      <h3>Enviar novo vídeo (simulado)</h3>
      <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
      <textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
      <button onClick={simulateUpload}>Simular Envio</button>
      <h3>Seus envios:</h3>
      <ul>
        {videos.map((v) => (
          <li key={v.id}>{v.title} — {v.description}</li>
        ))}
      </ul>
    </div>
  );
}