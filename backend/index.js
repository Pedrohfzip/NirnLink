import express from "express"
import dotenv from "dotenv"
import router from "./src/Routes/index.js";
import databaseConnection from "./src/Database/index.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(router);


app.listen(process.env.PORT, () => {
    try {
        databaseConnection();
        console.log(`Server is running http://localhost:${process.env.PORT}`);
    } catch (error) {
        console.error("Erro ao conectar:", error);
    }
});


