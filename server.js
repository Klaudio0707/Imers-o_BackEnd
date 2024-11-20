import express from 'express';
import conectarAoBanco from './src/config/dbConfig.js';

// Conecta ao banco de dados utilizando a string de conexão fornecida no ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Array de posts (dados simulados)
const posts = [
    {
        id: 6,
        descricao: "Gato olhando pela janela",
        img: "https://placecats.com/300/200",
    },
    // ... outros posts
];

// Inicializa o servidor Express
const app = express();

// Habilita o parsing de JSON no corpo das requisições
app.use(express.json());

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor Escutando...");
});

// Função assíncrona para buscar todos os posts do banco de dados
async function getTodosPosts() {
    // Seleciona o banco de dados "imersao-metaverso"
    const db = conexao.db("imersao-metaverso");
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}

// Rota para buscar todos os posts
app.get("/posts", async (req, res) => {
    // Busca os posts no banco de dados
    const resultado = await getTodosPosts();
    // Envia os posts como resposta em formato JSON
    res.status(200).json(posts);
});

// function buscarPostID(id) {
// return posts.findIndex((post) => {
// return post.id === Number(id);

// })
// };


// app.get("/posts/:id", (req, res) =>{
//     const index = buscarPostID(req.params.id);
//     res.status(200).json(posts[index]);
// });