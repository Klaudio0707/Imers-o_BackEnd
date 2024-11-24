import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsControllerr.js';


const corsOptions = {
origin: "http://localhost:8000",
optionsSuccessStatus: 200

}

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
   app.use(cors(corsOptions));
    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);
    app.post("/posts", postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);

};

export default routes;