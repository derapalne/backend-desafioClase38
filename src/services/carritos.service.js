import CarritosDaoMongoDB from "../daos/carritosDaoMongoDB.js";
import checkProducto from "../utils/check.js";
import config from "../utils/config.js";
const carritosDao = new CarritosDaoMongoDB(config.MONGO_URI);

const agregarCart = async (email) => {
  const carrito = { productos: [], userEmail: email, timestamp: Date.now() };
  return await carritosDao.guardar(carrito);
};

const deleteCartById = async (id) => {
  return await carritosDao.deleteById(id);
};

const getCartProductsById = async (id) => {
  const carrito = await carritosDao.getById(id);
  if (carrito) {
    return carrito.productos;
  } else {
    return { error: "Carrito Inexistente" };
  }
};

const agregarProdAlCart = async (idCart, idProd) => {
  const producto = await productosDao.getById(idProd);
  if (producto.error || !checkProducto(producto)) {
    return producto;
  } else {
    const idProdAgregado = await carritosDao.agregarProd(idCart, producto);
    if (isNaN(idProdAgregado)) {
      return { error: "Error al agregar producto" };
    } else {
      return idProdAgregado;
    }
  }
};

const borrarProdDelCart = async (idCart, prodSlot) => {
  const respuesta = await carritosDao.deleteProdBySlot(idCart, prodSlot);
  return respuesta;
};

const confirmarPedido = async (idCart) => {
  return await carritosDao.confirmarPedido(idCart);
}

export default {
  agregarCart,
  deleteCartById,
  getCartProductsById,
  agregarProdAlCart,
  borrarProdDelCart,
  confirmarPedido
};
