import {
  agregarCart,
  deleteCartById,
  getCartProductsById,
  agregarProdAlCart,
  borrarProdDelCart,
  confirmarPedido
} from "../services/carritos.service.js";
import checkProducto from "../utils/check.js";

const postCart = async (req, res) => {
  res.status(201).json(await agregarCart());
};

const deleteCartId = async (req, res) => {
  const id = req.params.id;
  res.status(200).json(await deleteCartById(id));
};

const getCartIdProducts = async (req, res) => {
  const id = req.params.id;
  const respuesta = await getCartProductsById(id);
  if (!respuesta.error) {
    res.status(200).json(respuesta);
  } else {
    res.status(404).json(respuesta);
  }
};

const postCartIdProducts = async (req, res) => {
  const idCart = req.params.id;
  const idProd = req.body.idProd;
  const prodSlot = req.body.prodSlot;
  const doDelete = req.body.delete;
  // Si existe el valor doDelete, significa BORRAR el producto 👍
  if (doDelete) {
    const respuesta = await borrarProdDelCart(idCart, prodSlot);
    if (respuesta.error) {
      res.status(204).json(respuesta);
    } else {
      res.status(201).redirect("/");
    }
  } else {
    const respuesta = await agregarProdAlCart(idCart, idProd);
    if (respuesta.error) {
      res.status(204).json(respuesta);
    } else {
      res.status(201).redirect("/");
    }
  }
};

const postCartConfirmar = async (req, res) => {
    const idCart = req.params.id;
    await confirmarPedido(idCart);
    res.status(200).render("pedido-confirmado");
}

export default { postCart, deleteCartId, getCartIdProducts, postCartIdProducts, postCartConfirmar };
