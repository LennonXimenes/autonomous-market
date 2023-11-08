import { NextFunction, Request, Response } from "express";
import market from "./database";
import { iProduct } from "./interfaces";

const verifyId = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { id } = req.params;
    console.log(id)

    const prodIndex: number = market.findIndex(
        (product) => product.id === Number(id)
    );
    console.log(prodIndex)


    if (prodIndex === -1) {
        return res.status(404).json({ message: "Product not found." });
    };

    res.locals.prodIndex = prodIndex;

    return next();
}

const verifyName = (req: Request, res: Response, next: NextFunction): Response | void => {
    const name = req.body.name;

    const findProduct = market.find(
        (product) => product.name === name
    )

    if (findProduct) {
        return res.status(409).json({ message: "Product already registered." })

    }

    return next();
}

export { verifyId, verifyName };
