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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
