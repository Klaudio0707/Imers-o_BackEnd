import fs from "fs";
import { getTodosPosts, createPost, atualizarPost } from "../models/postModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";


export async function listarPosts(req, res) {
    // Busca os posts no banco de dados
    const resultado = await getTodosPosts();
    // Envia os posts como resposta em formato JSON
    res.status(200).json(resultado);
};

export async function postarNovoPost(req, res) {
    const novoPosts = req.body;
    try {
        const postCriado = await createPost(novoPosts);
        res.status(201).json(postCriado);
    } catch (erro) {
        console.log(erro.messege);
        res.status(500).json({ messege: "Falha na requisição" });

    }
}
export async function uploadImagem(req, res) {
    const novoPosts = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        const postCriado = await createPost(novoPosts);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(201).json(postCriado);
    } catch (erro) {
        console.log(erro.messege);
        res.status(500).json({ messege: "Falha na requisição" });

    }


}
export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
  
    try {
        const imageBuffer =fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer)

        const postAtualizado = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const postCriado = await atualizarPost(id, postAtualizado);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.log(erro.messege);
        res.status(500).json({ messege: "Falha na requisição - Atualizar" });

    }
}
