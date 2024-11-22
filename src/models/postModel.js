import conectarAoBanco from "../config/dbConfig.js";


// Conecta ao banco de dados utilizando a string de conexão fornecida no ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export default async function getTodosPosts() {
    // Seleciona o banco de dados "imersao-metaverso"
    const db = conexao.db("Imersao-metaverso");
    // Seleciona a coleção "posts"
    const colecao = db.collection("posts");
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}