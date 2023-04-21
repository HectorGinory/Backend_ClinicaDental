import express from 'express';
import mongoose from 'mongoose';
const app = express();
mongoose.connect('mongodb+srv://dbAdmin:dbAdmin1234@clinicadental.trxdmql.mongodb.net/test').then(() => {
    console.log('Connected');
}).catch(() => {
    console.log('Failed to connect');
});
app.use(express.json());
app.listen(3000, () => console.log("Servidor levantado en 3000"));
//# sourceMappingURL=app.js.map