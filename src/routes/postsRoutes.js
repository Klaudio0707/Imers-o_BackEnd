import express from 'express';
import { listarPosts } from '../controllers/postsControllerr.js';


const routes = (app) => {

    // Inicializa o servidor Express
   app.use(express.json());
    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);
    app.post("/posts", )
}

export default routes;