import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";


// Conecta ao banco de dados utilizando a string de conexão fornecida no ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export  async function getTodosPosts() {
    // Seleciona o banco de dados "imersao-metaverso"
    const db = conexao.db("Imersao-metaverso");
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}

export async function createPost(novoPosts){
     // Seleciona o banco de dados "imersao-metaverso"
     const db = conexao.db("Imersao-metaverso");
     // Seleciona a coleção "posts"
     const colecao = db.collection("posts");
     // adiciona um novo documento na coleção
     return colecao.insertOne(novoPosts);


}
export async function atualizarPost(id, novoPosts){
    // Seleciona o banco de dados "imersao-metaverso"
    const db = conexao.db("Imersao-metaverso");
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id); 
    // adiciona um novo documento na coleção
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPosts})
};