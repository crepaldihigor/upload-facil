// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDTHwl-XZiJTR9EQdhfiDHnYWD8Pef44Gc",
  authDomain: "upload-facil.firebaseapp.com",
  projectId: "upload-facil",
  storageBucket: "upload-facil.appspot.com",
  messagingSenderId: "590510592947",
  appId: "1:590510592947:web:0f11eba4c424b6c404b1c6"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa a autenticação
const auth = getAuth(app);

// Exporta a autenticação para ser usada em outras partes do site
export { auth };
