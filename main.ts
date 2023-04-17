import express from 'express';

const app = express();
app.use(express.json());

app.listen(3000, () => console.log("Servidor levantado en 3000"));

// listado descripciones no
// detalles descripciones si
