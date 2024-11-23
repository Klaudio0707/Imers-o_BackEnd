import fs from "fs";
import {getTodosPosts, createPost} from "../models/postModel.js";


export async function listarPosts(req, res) {
    // Busca os posts no banco de dados
    const resultado = await getTodosPosts();
    // Envia os posts como resposta em formato JSON
    res.status(200).json(resultado);
};

export async function postarNovoPost(req, res) {
const novoPosts = req.body;
try{
    const postCriado = await createPost(novoPosts);
    res.status(201).json(postCriado);
} catch(erro){
console.log(erro.messege);
res.status(500).json({messege:"Falha na requisição"});

}
}
export async function uploadImagem(req, res) {
    const novoPosts ={
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
}; 
    try{
        const postCriado = await createPost(novoPosts);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(201).json(postCriado);
    } catch(erro){
    console.log(erro.messege);
    res.status(500).json({messege:"Falha na requisição"});
    
    }


}