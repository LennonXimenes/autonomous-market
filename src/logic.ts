import { Request, Response } from "express";
import { iProduct } from "./interfaces";
import market from "./database";

let id = 0;

const readProduct = (req: Request, res: Response): Response | any => {
    return res.status(200).json(market)
};

const createProduct = (req: Request, res: Response): Response => {
    id ++;

    let expirationDate = new Date();

    const newProduct: iProduct = {
        id,
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        section: req.body.section,
        calories: req.body.calories,
        expirationDate,
    }

    market.push(newProduct);

    return res.status(201).json(newProduct);
}

export { readProduct, createProduct };