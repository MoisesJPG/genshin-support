document.addEventListener("DOMContentLoaded", () => {
    // Abrir o crear la base de datos
    const request = indexedDB.open("database", 1);

    request.onerror = function(event) {
        console.log("Error al abrir la base de datos:", event.target.errorCode);
    };

    request.onupgradeneeded = function(event) {
        // Crear un almacén de objetos (tabla) llamado "miAlmacen"
        const db = event.target.result;
        const miAlmacen = db.createObjectStore("miAlmacen", { keyPath: "id", autoIncrement: true });

        // Puedes agregar índices u otros ajustes aquí si es necesario
    };

    request.onsuccess = function(event) {
        console.log("Base de datos abierta con éxito");
        db = event.target.result;
    };
});

function addData() {
    const transaction = db.transaction(["miAlmacen"], "readwrite");
    const miAlmacen = transaction.objectStore("miAlmacen");

    // Agregar datos de ejemplo
    const data = { mensaje: "¡Hola, mundo!" };
    const request = miAlmacen.add(data);

    request.onsuccess = function(event) {
        console.log("Datos agregados con éxito");
    };

    request.onerror = function(event) {
        console.log("Error al agregar datos:", event.target.errorCode);
    };
}

function readData() {
    const transaction = db.transaction(["miAlmacen"], "readonly");
    const miAlmacen = transaction.objectStore("miAlmacen");

    // Leer todos los datos
    const request = miAlmacen.openCursor();

    request.onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            console.log("ID:", cursor.key, "Mensaje:", cursor.value.mensaje);
            cursor.continue();
        } else {
            console.log("Fin de los datos");
        }
    };

    request.onerror = function(event) {
        console.log("Error al leer datos:", event.target.errorCode);
    };
}
