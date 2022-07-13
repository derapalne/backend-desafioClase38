import ProductosDaoMongoDB from "../daos/productosDaoMongoDB";
import {config } from "../utils/config.js"
const productosDao = new ProductosDaoMongoDB(config.MONGO_URI);

const getProds = (id) => {
    if(isNaN(id)) {
        return await productosDao.getAll();
    } else {
        return await productosDao.getById(id);
    }
}

const addProd = (producto) => {
    return productosDao.agregar(producto);
}

export default {getProds, addProd}
