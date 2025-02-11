import { Schema, model } from "mongoose";
import cartModel from "./cart.js";


const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    rol: {
        type: String,
        default: "Usuario"
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts"
    }
})

// genero un new carrito al crear un usuario
userSchema.post("save", async function (doc) {
    try {
        if (!doc.cart) { // evito crear multiples carritos
            const newCart = await cartModel.create({ products: [] });
            await model("users").findByIdAndUpdate(doc._id, { cart: newCart._id }); // referencio el id del carrito con el del user 
        }


    } catch (e) {
        console.error("error al crear carrito", e);

    }
});

const userModel = model("users", userSchema)

export default userModel