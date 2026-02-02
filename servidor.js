const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Configura para receber JSON
app.use(bodyParser.json());

// Define a pasta pública
app.use(express.static(path.join(__dirname, 'public')));

// Importa usuários
const users = require('./data/users.json');

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) res.json({ success: true, premium: user.premium });
  else res.json({ success: false });
});

// Rota raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
