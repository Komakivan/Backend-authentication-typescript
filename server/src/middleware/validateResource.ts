import {Request, Response, NextFunction, query} from 'express'
import {AnyZodObject} from "zod";

const validateResourse = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next()
    } catch (e: any) {
        return res.status(400).send(e.errors)
    }
}

export { validateResourse }