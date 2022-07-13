import {
  getProds,
  addProd,
  updateProdById,
  deleteProdById
} from "../services/productos.service.js";
import checkProducto from "../utils/check.js";

const getProdId = async (req, res) => {
  const respuesta = await getProds(req.params.id);
  if (respuesta.error) {
    res.status(204).json(respuesta);
  } else {
    res.status(200).json(respuesta);
  }
};

const postProdId = async (req, res) => {
  const producto = req.body.producto;
  if (checkProducto(producto)) {
    const prodId = await addProd(producto);
    res.status(201).json(prodId);
  } else {
    res
      .status(204)
      .json({
        error: "El producto no cumple con los requisitos. Ver consola.",
      });
  }
};

const putProdId = async (req, res) => {
  const id = req.params.id;
  const producto = req.body.producto;
  if (checkProducto(producto)) {
    const prodId = await updateProdById(id, producto);
    res.status(201).json(prodId);
  } else {
    res
      .status(204)
      .json({
        error: "El producto no cumple con los requisitos. Ver consola.",
      });
  }
};

const deleteProdId = async (req, res) => {
    const id = req.params.id;
    const respuesta = await deleteProdById(id);
    if(respuesta.error) {
        res.status(204).json(respuesta);
    } else {
        res.status(200).json(respuesta);
    }
}

export default { getProdId, postProdId, putProdId, deleteProdId };
