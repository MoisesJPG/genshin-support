let db;

function initDatabase() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'database.db', true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function (e) {
        const uInt8Array = new Uint8Array(this.response);
        const SQL = initSqlJs({ locateFile: () => 'database.db' });
        db = new SQL.Database(uInt8Array);
        console.log('Base de datos abierta con éxito');
    };

    xhr.send();
}

function queryDatabase() {
    if (!db) {
        console.error('La base de datos no está abierta. Asegúrate de abrir la base de datos primero.');
        return;
    }

    // Ejemplo de consulta SQL
    const query = 'SELECT * FROM characters';
    const result = db.exec(query);

    console.log('Resultado de la consulta:', result);
}
