import {Router} from 'express';
import ProductosDaoMongoDB from '../daos/productosDaoMongoDB.js';
import {config} from '../utils/config.js';
import {isAdmin} from '../middlewares/isAdmin.js';
import { isAuth } from '../middlewares/isAuthenticated.js';
import {getProdId, postProdId} from "../controllers/productos.controller.js"


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
routerProd.put("/:id", isAdmin, async (req, res) => {
    const admin = req.body.admin;
    const id = req.params.id;
    const producto = req.body.producto;
    const prodId = await productosDao.updateById(id, producto);
    res.status(201).json(prodId);
});

// Borra un producto por su ID
// ADMIN
routerProd.delete("/:id", isAdmin, async (req, res) => {
    const admin = req.body.admin;
    const id = req.params.id;
    const prodId = await productosDao.deleteById(id);
    res.status(200).json(prodId);
});

export default routerProd;