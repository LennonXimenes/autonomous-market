import { NextFunction, Request, Response } from "express";
import market from "./database";
import { iProduct } from "./interfaces";

const requestLog = (req: Request, res: Response, next: NextFunction): Response | void => {
    console.log(`${req.method}: ${req.url}`);

    return next();
}

const verifyId = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { id } = req.params;

    const prodIndex: number = market.findIndex(
        (product: iProduct) => product.id === Number(id)
    );

    if (prodIndex === -1) {
        return res.status(404).json({ message: "Product not found." });
    };

    const foundProduct = market[prodIndex];

    res.locals = { ...res.locals, prodIndex, foundProduct };

    return next();
}

const verifyName = (req: Request, res: Response, next: NextFunction): Response | void => {
    const name = req.body.name;

    if (!name) {
        return next();
    };

    const findProduct: iProduct | undefined = market.find(
        (product: iProduct) => product.name === name
    );

    if (findProduct) {
        return res.status(409).json({ message: "Product already registered." });
    };

    return next();
}

export { requestLog, verifyId, verifyName };
