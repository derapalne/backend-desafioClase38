import ProductosDaoMongoDB from "../daos/productosDaoMongoDB";
import {config } from "../utils/config.js"
const productosDao = new ProductosDaoMongoDB(config.MONGO_URI);

const getProds = async (id) => {
    if(isNaN(id)) {
        return await productosDao.getAll();
    } else {
        return await productosDao.getById(id);
    }
}

const addProd = async (producto) => {
    return await productosDao.agregar(producto);
}

const updateProdByID = async (id, porducto) => {
    return await productosDao.updateById(id, porducto);
}

const deleteProdById = async (id) => {
    return await productosDao.deleteById(id);
}

export default {getProds, addProd, updateProdByID, deleteProdById}
