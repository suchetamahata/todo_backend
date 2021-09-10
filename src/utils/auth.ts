import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
const secret = 'my super secret'

export const authMiddleware = (req: Request| any, res: Response, next: NextFunction) =>{
    console.log(req.headers)
    try {
        if (req.headers.authorization === undefined) {
            res.status(400).send('authorization token not provided')
            return
        }
        const token = (req.headers.authorization).split(' ')[1]
        const decodedToken: string | any = jwt.verify(token, secret)
        req.loggedUser= {...decodedToken} 
        next()
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(403).send(error.message)
            console.log(error.name, error.message)
        }
    }
}

