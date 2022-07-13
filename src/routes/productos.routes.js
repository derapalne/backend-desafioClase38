import {Router} from 'express';
import ProductosDaoMongoDB from '../daos/productosDaoMongoDB.js';
import {config} from '../utils/config.js';
import {isAdmin} from '../middlewares/isAdmin.js';
import { isAuth } from '../middlewares/isAuthenticated.js';
import {getProdId, postProdId, putProdId} from "../controllers/productos.controller.js"


const routerProd = Router();
const productosDao = new ProductosDaoMongoDB(config.MONGO_URI);

// ---------------------------------------------- ROUTER PRODUCTOS ----------------------//

// Me permite listar todos los productos disponibles ó un producto por su ID
// USUARIO + ADMIN
routerProd.get("/:id?", isAuth, getProdId);

// Para incorporar productos al listado
// ADMIN
routerProd.post("/", isAdmin, postProdId);

// Actualiza un producto por su ID
// ADMIN
routerProd.put("/:id", isAdmin, putProdId);

// Borra un producto por su ID
// ADMIN
routerProd.delete("/:id", isAdmin, );

export default routerProd;