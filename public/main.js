import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD54QaImesnJryGCVDug3r8xg-xtfplpj0",
    authDomain: "inventario-manto.firebaseapp.com",
    projectId: "inventario-manto",
    storageBucket: "inventario-manto.appspot.com",
    messagingSenderId: "141780552102",
    appId: "1:141780552102:web:d434e16eadaa9636a22767",
    measurementId: "G-8052EN0Z0M"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener el ID desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function mostrarEquipo() {
    if (!id) {
        document.getElementById('app').innerHTML = '<h1>ID de equipo no proporcionado</h1>';
        return;
    }

    try {
        const docRef = doc(db, 'equipos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById('app').innerHTML = `
                <h1>Información del Equipo</h1>
                <p><strong>Nombre:</strong> ${data.nombre}</p>
                <p><strong>Descripción:</strong> ${data.descripcion}</p>
            `;
        } else {
            document.getElementById('app').innerHTML = '<h1>No se encontró información para este equipo</h1>';
        }
    } catch (error) {
        console.error('Error al obtener el documento:', error);
        document.getElementById('app').innerHTML = '<h1>Error al cargar los datos del equipo</h1>';
    }
}

mostrarEquipo();
