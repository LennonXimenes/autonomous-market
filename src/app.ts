import express, { Application, Request, Response, json } from "express";

const app: Application = express();
app.use(json());

app.get("/", (req: Request, res: Response): Response | any => {
    return res.status(200).json({ message: "Hello World!" })
})

const PORT = 3000;
const runningMsg = `Server is running on http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(runningMsg);
});