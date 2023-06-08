const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const db = require('./db');
const Usuario = require('./usuario');
const cloudinary = require('cloudinary');

// Criar o aplicativo Express
const app = express();
app.use(express.json());
app.use(cors());

cloudinary.config({ 
  cloud_name: 'dweli7gti', 
  api_key: '592793572644235', 
  api_secret: 'nL-CE7FLOE1nBKO_A_v84yk031w' 
});

// Rota POST para inserir dados na tabela
app.post('/usuario', async (req, res) => {
    try {
        const { url, legenda } = req.body;
        console.log("ok");
    
        // Inserir o registro na tabela 'usuario'
        const usuario = await Usuario.create({ url, legenda });
    
        console.log('Usuário cadastrado com sucesso:', usuario);
        res.status(200).send('Usuário cadastrado com sucesso');
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).send('Erro ao cadastrar usuário');
      }
});

app.get('/', async (req,res) => {
    try {
        const usuarios = await Usuario.findAll(); // Consulta todos os usuários no banco de dados
    
        res.json(usuarios); // Retorna os usuários como resposta em formato JSON
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
        res.status(500).json({ error: 'Erro ao obter usuários' });
      }
});

app.get('/images', async (req, res) => {
  try {
    // Recupere as URLs das imagens do Cloudinary
    const { resources } = await cloudinary.api.resources();

    // Extraia as URLs das imagens e retorne como resposta
    const imageUrls = resources.map(resource => resource.url);
    res.json(imageUrls);
  } catch (error) {
    console.error('Erro ao obter URLs das imagens:', error);
    res.status(500).json({ error: 'Erro ao obter URLs das imagens' });
  }
});


// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port} http://localhost:3000`);
});
