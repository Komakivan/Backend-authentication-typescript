import { Request, Response } from 'express';
import { createUserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';

export async function createUserHandler(req: Request<{}, {}, createUserInput>, res: Response) {
    try {
        const body = req.body
        const user = await createUser(body)
        res.send("user created successfully")
    } catch (e: any) {
        if(e.code === 11000) {
            return res.status(409).send("account already exists")
        }
        return res.status(500).send(e)
    }
}