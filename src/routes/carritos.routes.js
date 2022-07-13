import { Router } from "express";
import CarritosDaoMongoDB from "../daos/carritosDaoMongoDB.js";
import ProductosDaoMongoDB from "../daos/productosDaoMongoDB.js";
import { config } from "../utils/config.js";
import { logger } from "../utils/logger.js";
import { sendOrderMail } from "../utils/mailer.js";
import { sendOrderSMS, sendOrderWhatsapp } from "../utils/twilioStuff.js";
import { postCart, deleteCartId, getCartIdProducts, postCartIdProducts, postCartConfirmar } from "../controllers/carritos.controller.js";

import { isAuth } from "../middlewares/isAuthenticated.js";

const routerCart = Router();
const carritosDao = new CarritosDaoMongoDB(config.MONGO_URI);
const productosDao = new ProductosDaoMongoDB(config.MONGO_URI);

// ---------------------------------------------- ROUTER CARRITO ------------------------//

// Crea un carrito y devuelve su ID
routerCart.post("/", isAuth, postCart);

// Vacía un carrito y lo elimina
routerCart.delete("/:id", isAuth, deleteCartId);

// Me permite listar todos los productos guardados en el carrito
routerCart.get("/:id/productos", isAuth, getCartIdProducts);

// Para incorporar productos al carrito por su ID de producto
// ó!!!! borrar por su slot. Por qué lo hice así? porque no puedo hacer querys delete de
// forma simple desde html.
routerCart.post("/:id/productos", isAuth, postCartIdProducts );

// Para confirmar el pedido, reiniciando el array de productos y notificando cliente y admin
routerCart.post("/:id/confirmar", isAuth, postCartConfirmar);

export default routerCart;
