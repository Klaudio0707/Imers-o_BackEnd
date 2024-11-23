import express from 'express';
import multer from 'multer';
import { listarPosts, postarNovoPost, uploadImagem } from '../controllers/postsControllerr.js';

// função para quem usa o windows
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {

    // Inicializa o servidor Express
   app.use(express.json());
    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);
    app.post("/posts", postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
}

export default routes;