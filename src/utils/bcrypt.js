import { hashSync, compareSync, genSaltSync } from "bcrypt";



//encriptar una contraseña!!

export const createHash = (password) => hashSync(password, genSaltSync(5))

//validar mi pass con la ingresada por el usuario
export const validatePassword = (passIngresada, passBDD) => compareSync(passIngresada, passBDD)



