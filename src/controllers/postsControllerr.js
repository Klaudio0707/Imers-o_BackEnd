import getTodosPosts from "../models/postModel.js";


export async function listarPosts(req, res) {
    // Busca os posts no banco de dados
    const resultado = await getTodosPosts();
    // Envia os posts como resposta em formato JSON
    res.status(200).json(resultado);
};

export async function criarPosts(req, res) {


    
}