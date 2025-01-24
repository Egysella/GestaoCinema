// db.js
const mysql = require('mysql2');

// Crie a conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',      
    password: '', 
    database: 'cinema'  
});

// Testa a conexão
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida com o banco de dados!');
});

module.exports = connection;
