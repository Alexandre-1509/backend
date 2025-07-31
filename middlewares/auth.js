import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

const auth = (req, res, next) => {
    const token = req.headers.authorization

    if(!token){
        res.status(401).json({ message: 'Acesso Negado'})
    }

    try{
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)
        res.status(200).json(decoded)
    }catch(err){
        res.status(401).json('Token Invalido')
    }

    next()
}

export default auth