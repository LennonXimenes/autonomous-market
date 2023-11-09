import express, { Application, json } from "express";
import { createProduct, deleteProduct, readProduct, retrieveProduct, updateProduct } from "./logic";
import { requestLog, verifyId, verifyName } from "./middlewares";


const app: Application = express();
app.use(json());
app.use(requestLog);

app.get("/products", readProduct);
app.get("/products/:id", verifyId, retrieveProduct);

app.post("/products", verifyName, createProduct);

app.patch("/products/:id", verifyName, verifyId, updateProduct);

app.delete("/products/:id", verifyId, deleteProduct);

const PORT = 3000;
const runningMsg = `Server is running on http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(runningMsg);
});