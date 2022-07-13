import ContenedorMongoDB from "../contenedores/contenedorMongoDB.js";
import mongoose from "mongoose";
import Carritos from "../models/carritos.js";
import { logErr, logger } from "../utils/logger.js";

class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor(uri) {
    super(uri, Carritos);
  }

  async getByEmail(email) {
    try {
      mongoose.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const respuesta = await this.Model.find(
        { userEmail: email },
        { _id: 0, __v: 0 }
      );
      if (respuesta[0]) {
        return respuesta[0];
      } else {
        return null;
      }
    } catch (e) {
      logErr.error(e);
    }
  }

  async agregarProd(id, producto) {
    try {
      mongoose.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const carrito = await this.Model.find({ id: id });
      if (carrito.length) {
        // Agregar el SLOT en el carrito es mi intento de solucionar el problema de diseño
        // que plantea el desafío, se pueden tener varios del mismo producto pero eliminarlos
        // o seleccionarlos individualmente termina siendo imposible ya que todos sus datos son
        // iguales. Igual no puedo hacer que esta línea de abajo funcione y le agregue
        // la propiedad de SLOT al producto.
        // logger.trace("Carrito.productos.length " +  carrito[0].productos.length.toString())
        producto.slot = carrito[0].productos.length + 1;
        // logger.trace("Agregando slot al producto producto: " + producto.slot);
        // logger.trace("Producto: " + producto);
        await carrito[0].productos.push(producto);
        await this.Model.updateOne(
          { id: id },
          { productos: carrito[0].productos }
        );
        // logger.trace("Carrito.productos " + carrito[0]);
        return producto.id;
      } else {
        return "Id inexistente.";
      }
    } catch (e) {
      console.log(e);
    }
  }

  async deleteProdBySlot(id, slotProd) {
    try {
      mongoose.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const carritoArray = await this.Model.find({ id: id });
      if (carritoArray.length) {
        const oldLenght = carritoArray[0].productos.length;
        carritoArray[0].productos = carritoArray[0].productos.filter(
          (e) => e.slot != slotProd
        );
        logger.trace(carritoArray[0].productos.length + " " + oldLenght);
        if (carritoArray[0].productos.length != oldLenght) {
          await this.Model.updateOne(
            { id: id },
            { productos: carritoArray[0].productos }
          );
          return slotProd;
        } else {
          return { error: "No se ha podido borrar el producto" };
        }
      } else {
        return { error: "Id inexistente." };
      }
    } catch (e) {
      console.log(e);
    }
  }

  async deleteAllProds(id) {
    try {
      mongoose.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const carritoArray = await this.Model.find({ id: id });
      if (carritoArray.length) {
        carritoArray[0].productos = [];
        logger.trace("CarritoArray: --- " + carritoArray[0]);
        await this.guardar(carritoArray[0]);
        return carritoArray[0].id;
      } else {
        return { error: "Id inexistente." };
      }
    } catch (e) {
      console.log(e);
    }
  }

  async confirmarPedido(id) {
    try {
      mongoose.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const carritoArray = await this.Model.find({ id: id });
      if (carritoArray.length) {
        const productos = carritoArray[0].productos;
        const ok = await this.deleteAllProds(id);
        if (ok.error) {
          return { error: "No se han podido borrar los productos del carrito" };
        } else {
          return productos;
        }
      } else {
        return { error: "Id inexistente." };
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default CarritosDaoMongoDB;
