import express, { Application, json } from "express";
import { createProduct, readProduct, retrieveProduct } from "./logic";
import { verifyId, verifyName } from "./middlewares";


const app: Application = express();
app.use(json());

app.get("/products", readProduct);
app.get("/products/:id", verifyId, retrieveProduct);

app.post("/products", verifyName, createProduct);

app.patch("/products/:id", verifyId, verifyName);

app.delete("/products/:id", verifyId);

const PORT = 3000;
const runningMsg = `Server is running on http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(runningMsg);
});