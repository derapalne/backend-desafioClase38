import CarritosDaoMongoDB from "../daos/carritosDaoMongoDB.js";
import { config } from "../utils/check.js";
const carritosDao = new CarritosDaoMongoDB(config.MONGO_URI)

const getMainCarrito = (user) => {
    let carrito = await carritosDao.getByEmail(user.email);
      if (!carrito || carrito.userEmail != user.email) {
        await carritosDao.agregarCart(user.email);
        carrito = await carritosDao.getByEmail(user.email);
      }
      return carrito;
}

export default {getMainCarrito};