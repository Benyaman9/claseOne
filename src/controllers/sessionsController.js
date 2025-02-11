import { generateToken } from "../utils/jwt.js"



export const login = async (req, res) => {
    try {
        if(!req.user) {
            return res.status(401).send("Usuario o contraseña no validos")
        }

        const token = generateToken(req.user)


        req.session.user ={
            email: req.user.email,
            first_name: req.user.first_name
        }
        

        //previo a redireccionar envio la cookie
        res.cookie('coderCookie', token, {
            httpOnly: true,
            secure: false,  // evitar errores por https
            maxAge: 3600000 // una hora
        })
        res.status(200).redirect('/')  //send("usuario logueado correctamente")
    } catch (e) {
        console.log(e);
        res.status(500).send("error al loguear usuario")
        
    }
    
}

export const register = async (req, res) => {
    try {
        
        
        if(!req.user){ //consulto si en la sesion esta mi usuario
    return res.status(400).send("mail ya registrado")
        }
        return res.status(201).send("usuario creado correctamente")
    } catch (e) {
        console.log(e);
        
        res.status(500).send("error al registrar usuario")
    }

}

export const viewRegister = (req, res) => {
    res.status(200).render('templates/register', {})
}

export const viewLogin = (req, res) => {
    res.status(200).render('templates/login', {})
}


export const githubLogin = (req, res) =>{
    try {
        
        req.session.user ={
            email: req.user.email,
            first_name: req.user.first_name
        }
        res.status(200).redirect("/")
    } catch (e) {
        console.log(e);
        res.status(500).send("error al loguear usuario")
        
    }
}