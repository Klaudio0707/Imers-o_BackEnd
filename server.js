import express from 'express';
import routes from './src/routes/postsRoutes.js';

// Inicializa o servidor Express
const app = express();
routes(app);
// Habilita o parsing de JSON no corpo das requisições


// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor Escutando...");
});



