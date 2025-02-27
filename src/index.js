import express from 'express'
import path from 'path'
import { __dirname } from './path.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import {create} from 'express-handlebars'
import passport from 'passport'
import initalizatePassport from './config/passport.config.js'
import MongoStore from 'connect-mongo'
import indexRouter from './routes/index.routes.js'
import mongoose from 'mongoose'
import cors from 'cors'


const app = express()
const PORT = 5000
const hbs = create()
app.use(cors())

//const fileStorage = new FileStore(session)
app.use(express.json())
app.use(cookieParser("CoderSecret")) //Si agrego contraseña "firmo" las cookies
app.use(session({
    //ttl Time to Live tiempo de vida (segundos)
    //retries: Cantidad de veces que el servidor va a intentar leer ese archivo
    //store: new fileStorage({path: './src/sessions', ttl: 10, retries: 1 }),
    
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://benjaartunduaga00:07AywxOhOrJdyRhH@cluster0.0mjfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        mongoOptions: {},
        ttl: 15
    }),
    secret: 'SessionSecret',

    resave: true,
    saveUninitialized: true
}))



mongoose.connect("mongodb+srv://benjaartunduaga00:07AywxOhOrJdyRhH@cluster0.0mjfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log("DB is conectedd"))
    .catch((e)=>console.log("error al conectarme a DB:", e))

    initalizatePassport()
    app.use(passport.initialize())
    app.use(passport.session())
    app.engine('handlebars', hbs.engine)
    app.set('view engine', 'handlebars')
    app.set('views', path.join(__dirname, 'views')) //Concateno evitando erroes de / o \
    
    
    //Rutas
    app.use('/', indexRouter)


    
    app.listen(PORT, () => {
        console.log(`Server on port ${PORT}`)
    })
/*
const auth = (req, res, next) => {
    if (req.session?.email == "f@f.com") {
        return next() //continuo con la ejecucion normal
    } else {
        return res.status(401).send("Error al autenticar usuario") //401 error de autenticacion
    }
}

// creacion de una cookie 
app.get('/setCookie', (req, res) => {
    // devuelvo una cookie
    res.status(200).cookie('coderCookie', "esta es mi primera cookie", { maxAge: 1000000 }).send("cookie creada")
})

// crear una cookie firmada firmada
app.get('/setSignedCookie', (req, res) => {

    // devuelvo todas las cookies firmadas
    res.status(200).cookie('coderCookieSigned', "esta es mi primera cookie firmada", { maxAge: 100000, signed: true }).send("cookie creada")
})

// consultar una cookie una cookie 
app.get('/getCookie', (req, res) => {
    // devuelvo todas las cookies del nav
    res.status(200).send(req.cookies)
})


// consultar una cookie con firma
app.get('/getCookieSigned', (req, res) => {
    // devuelvo todas las cookies del nav que esten firmadas y que no hayan presentado adulteraciones
    res.status(200).send(req.signedCookies)
})



// deletear una cookie una cookie 
app.get('/deleteCookie', (req, res) => {

    res.status(200).clearCookie("coderCookie").send("cookie eliminada")
})


//SESSIONS aqui inicia sesion un usuario con 
// un contador de veces que va ingresando


app.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.status(200).send(`Ingresaste un total de ${req.session.counter} veces`)
    } else {
        req.session.counter = 1
        res.status(200).send("Bienvenido/a")
    }
})

// ELIMINAR UNA SESSION
app.get('/logout', (req, res) => {
    req.session.destroy((e) => {  // destroy elimina todas las sessiones del navegador
        if (e) {
            res.status(500).send(e)
        } else {
            res.status(200).send("Logout")
        }
    })
})


app.get('/login', (req, res) => {
    const { email, password } = req.body

    if ((email == "f@f.com" && password == "1234") || (email == "pepe@pepe.com" && password == "1234")) 
        {
        req.session.email = email
        req.session.admin = true
        res.status(200).send("Usuario logueado")
    } else {
        res.status(400).send("Usuario o contraseña no validos")
    }
})


app.get('/private', auth, (req, res) => {
    res.status(200).send("contenido de f@f.com")
})



app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
})
*/