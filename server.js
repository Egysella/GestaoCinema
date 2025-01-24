// server.js
const express = require('express');
const connection = require('./db'); // Importa a conexão
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors()); 
app.use(express.json()); 

// Middleware
app.use(express.json()); 
app.use(cors()); 

// Rota para listar todas as salas
app.get('/salas', (req, res) => {
    const query = 'SELECT * FROM salas';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar salas:', err);
            res.status(500).json({ error: 'Erro ao buscar salas' });
            return;
        }
        res.json(results);
    });
});

// Rota para adicionar uma nova sala
app.post('/salas', (req, res) => {
    const { nome, capacidade } = req.body;
    const query = 'INSERT INTO salas (nome, capacidade) VALUES (?, ?)';
    connection.query(query, [nome, capacidade], (err, results) => {
        if (err) {
            console.error('Erro ao adicionar sala:', err);
            res.status(500).json({ error: 'Erro ao adicionar sala' });
            return;
        }
        res.status(201).json({ message: 'Sala adicionada com sucesso!' });
    });
});


//rota para adicionar filmes
app.post("/filmes", (req, res) => { 
 const { titulo, duracao, genero, descricao} = req.body;
 const query = "INSERT INTO filmes (titulo, duracao, genero, descricao) VALUES (?, ?, ?, ?)";
 connection.query(query, [titulo, duracao, genero, descricao], (err, result) => { 
 if (err) { 
 res.status(500).send(err);
 } else { 
 res.status(201).send({ id: result.insertId, titulo, duracao, genero, descricao });
 } 
 });
});

app.get("/filmes", (req, res) => { 
connection.query("SELECT * FROM filmes", (err, result) => { 
 if (err) { 
 res.status(500).send(err);
 } else { 
 res.status(200).json(result);
 } 
 });
});


//rota para adicionar sessoes
app.post("/sessoes", (req, res) => { 
 const { id_sala, id_filme, data_hora } = req.body;
 const query = "INSERT INTO sessoes (id_sala, id_filme, data_hora) VALUES (?, ?, ?)";
 connection.query(query, [id_sala, id_filme, data_hora ], (err, result) => { 
 if (err) { 
 res.status(500).send(err);
 } else { 
 res.status(201).send({ id: result.insertId, id_sala, id_filme, data_hora });
 } 
 });
});


//join entre tabelas de filmes, salas e sessoes
app.get('/sessoes', (req, res) => {
    const sql = `
        SELECT 
            sessoes.id AS sessao_id,
            sessoes.data_hora,
            salas.nome AS sala_nome,
            filmes.titulo AS filme_titulo
        FROM sessoes
        JOIN salas ON sessoes.id_sala = salas.id
        JOIN filmes ON sessoes.id_filme = filmes.id;
    `;

    connection.query(sql, (err, result) => { 
        if (err) { 
        res.status(500).send(err);
        } else { 
        res.status(200).json(result);
        } 
        });
});

//rota para adicionar reserva
app.post('/reservas', (req, res) => {
    const { id_sessao, nome_cliente, lugares, tipo } = req.body;
    const query = `
        INSERT INTO reservas (id_sessao, nome_cliente, lugares, tipo)
        VALUES (?, ?, ?, ?)
    `;
    connection.query(query, [id_sessao, nome_cliente, lugares, tipo], (err, result) => { 
        if (err) { 
        res.status(500).send(err);
        } else { 
        res.status(201).send({ id: result.insertId, id_sessao, nome_cliente, lugares, tipo });
        } 
    });
});

app.get('/reservas', (req, res) => {
    const sql = `
    SELECT 
        reservas.nome_cliente, 
        reservas.lugares,
        sessoes.data_hora, 
        reservas.tipo AS tipo_ingresso,
        filmes.titulo AS filme_titulo, 
        salas.nome AS sala_nome,
        reservas.id as id_reserva
    FROM reservas
    JOIN sessoes ON reservas.id_sessao = sessoes.id
    JOIN filmes ON sessoes.id_filme = filmes.id
    JOIN salas ON sessoes.id_sala = salas.id;

    `;
    connection.query(sql, (err, result) => { 
        if (err) { 
        res.status(500).send(err);
        } else { 
        res.status(200).json(result);
        } 
        });
});


// Deletar um filme pelo ID
app.delete('/filmes/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM filmes WHERE id = ?`;

    console.log(`Recebendo pedido para deletar o filme com id: ${id}`);

    connection.query(sql, [id], (err, result) => { 
        if (err) { 
            console.error('Erro ao deletar filme:', err);
            res.status(500).json({ error: 'Erro ao deletar filme' });
        } else { 
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Filme não encontrado' });
            }

            console.log('Filme deletado com sucesso.');

            res.json({ message: 'Filme deletado com sucesso' });
        } 
        });
});

// Deletar uma sessao pelo ID
app.delete('/sessoes/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM sessoes WHERE id = ?`;

    console.log(`Recebendo pedido para deletar sessão com id: ${id}`);

    connection.query(sql, [id], (err, result) => { 
        if (err) { 
            console.error('Erro ao deletar sessão:', err);
            res.status(500).json({ error: 'Erro ao deletar sessão' });
        } else { 
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Sessão não encontrada' });
            }

            console.log('Sessão deletada com sucesso.');

            res.json({ message: 'Sessão deletada com sucesso.' });
        } 
        });
});


// Deletar uma reserva pelo ID
app.delete('/reservas/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM reservas WHERE id = ?`;

    console.log(`Recebendo pedido para deletar reserva com id: ${id}`);

    connection.query(sql, [id], (err, result) => { 
        if (err) { 
            console.error('Erro ao deletar reserva:', err);
            res.status(500).json({ error: 'Erro ao deletar reserva' });
        } else { 
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Reserva não encontrada' });
            }

            console.log('Reserva deletada com sucesso.');

            res.json({ message: 'Reserva deletada com sucesso.' });
        } 
        });
});

// Deletar uma sala pelo ID
app.delete('/salas/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM salas WHERE id = ?`;

    console.log(`Recebendo pedido para deletar sala com id: ${id}`);

    // Verifica se o ID é válido
    if (isNaN(id)) {
        console.error('ID inválido fornecido:', id);
        return res.status(400).json({ error: 'ID inválido' });
    }

    connection.query(sql, [id], (err, result) => { 
        if (err) { 
            console.error('Erro ao deletar sala:', err);
            res.status(500).json({ error: 'Erro ao deletar sala' });
        } else { 
            if (result.affectedRows === 0) {
                console.warn('Sala não encontrada para o ID fornecido:', id);
                return res.status(404).json({ error: 'Sala não encontrada' });
            }

            console.log('Sala deletada com sucesso.', { id });

            res.json({ message: 'Sala deletada com sucesso.' });
        } 
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
