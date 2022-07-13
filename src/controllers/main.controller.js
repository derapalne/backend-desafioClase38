import { getMainCarrito } from "../services/main.service.js";

const getMain = async (req, res) => {
  try {
    let carrito = await getMainCarrito(user);
    res.status(200).render("main", {
      usuario: req.user,
      productos: await productosDao.getAll(),
      carrito: carrito,
    });
  } catch (e) {
    logErr.error(e);
  }
};

const getLogin = (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.status(200).render("login", { error: null });
    }
  } catch (e) {
    logErr.error(e);
  }
};

const getLoginErr = (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.status(200).render("login", { error: "Credenciales incorrectas!" });
    }
  } catch (e) {
    logErr.error(e);
  }
};

const getRegister = (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.status(200).render("register", { error: null });
    }
  } catch (e) {
    logErr.error(e);
  }
};

const getRegisterErr = (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res
        .status(200)
        .render("register", { error: "Credenciales Incorrectas!" });
    }
  } catch (e) {
    logErr.error(e);
  }
};

const postLogout = (req, res) => {
  try {
    req.session.destroy((err) => {
      res.status(200).render("login", { error: null });
    });
  } catch (e) {
    logErr.error(e);
  }
};

export default { getMain, getLogin, getLoginErr, getRegister, getRegisterErr, postLogout };
