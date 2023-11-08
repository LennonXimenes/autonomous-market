import express, { Application, Request, Response, json } from "express";
import { createProduct, readProduct } from "./logic";


const app: Application = express();
app.use(json());

app.get("/products", readProduct);
app.get("/products/:id",);

app.post("/products", createProduct);

app.patch("/products/:id",);

app.delete("/products/:id",);

const PORT = 3000;
const runningMsg = `Server is running on http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(runningMsg);
});