import { Request, Response } from "express";
import { iProduct } from "./interfaces";
import market from "./database";

let id = 0;

const readProduct = (req: Request, res: Response): Response | any => {
    const amount = market.reduce((acc, value): number | any => acc + value.price, 0)

    return res.status(200).json({ total: amount, products: market })
};

const retrieveProduct = (req: Request, res: Response): Response | any => {
    const { foundProduct } = res.locals;

    return res.status(200).json(foundProduct);
}

const createProduct = (req: Request, res: Response): Response => {
    id++;
    let expirationDate = new Date()
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    const newProduct: iProduct = {
        id,
        ...req.body,
        expirationDate,
    }

    market.push(newProduct);

    return res.status(201).json(newProduct);
}

const updateProduct = (req: Request, res: Response): Response => {
    let { foundProduct } = res.locals;

    foundProduct = Object.assign(foundProduct, req.body);

    return res.status(200).json(foundProduct);
}

const deleteProduct = (req: Request, res: Response): Response => {
    const { prodIndex } = res.locals;

    market.splice(prodIndex, 1);

    return res.status(204).json()
}

export { readProduct, retrieveProduct, createProduct, updateProduct, deleteProduct };