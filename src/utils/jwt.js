import jwt from 'jsonwebtoken'

let secretKey = "codercoder"

export const generateToken = (user) => {
    /*
    oarametro1: objeto a guardar(user en este caso)
    param2: clave privada : secretKey
    param3: tiempo de vida del token
    */


    const token = jwt.sign({ user }, secretKey, { expiresIn: '24h'})
    return token
}





/*first_name: "benjamin",
last_name: "artunduaga",
email: "benja@benja.com",
password: "$2b$05$CJitUvcjU8XNAeURAijVl.MFibnJ4bEPpR7vFOroxSCwx1U9RuWZ.",
age: 24,
rol: "Usuario" */