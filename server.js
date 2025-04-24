const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost', // Altere para o host do seu banco
  user: 'root', // Altere para o usuário do banco
  password: 'sua_senha', // Altere para a senha do banco
  database: 'acampamento_db', // Nome do banco de dados
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Endpoint para autenticação
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).send('Erro no servidor');
    }

    if (results.length > 0) {
      return res.status(200).send({ message: 'Login bem-sucedido' });
    } else {
      return res.status(401).send({ message: 'Email ou senha inválidos' });
    }
  });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));