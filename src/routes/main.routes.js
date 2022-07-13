// >>>>>EXPRESS
import { Router } from "express";
const routerMain = Router();
// >>>>>CONTROLLERS
import {
  getMain,
  getLogin,
  getLoginErr,
  getRegister,
  getRegisterErr,
  postLogout
} from "../controllers/main.controller.js";
// >>>>>PASSPORT
import passport from "passport";
// >>>>>LOGUEO
import { logger, logErr } from "../utils/logger.js";
// >>>>>GUARDADO DE IMAGENES
import upload from "../utils/fileManager.js";
// >>>>>MIDDLEWARES
import { isAuth } from "../middlewares/isAuthenticated.js";

routerMain.get("/", isAuth, getMain);

routerMain.get("/login", getLogin);

routerMain.get("/login-error", getLoginErr);

routerMain.get("/register", getRegister);

routerMain.get("/register-error", getRegisterErr);

routerMain.post(
  "/register",
  isAuth,
  upload.single("avatar"),
  passport.authenticate("local-register", {
    successRedirect: "/",
    failureRedirect: "/register-error",
    passReqToCallback: true,
  })
);

routerMain.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login-error",
    passReqToCallback: true,
  })
);

routerMain.post("/logout", isAuth, postLogout);

export default routerMain;

// Agregar productos, DESCOMENTAR Y COMENTAR DE A UNO SINO SE CARGAN MAL

// productosDao.deleteAll();

// productosDao.agregar({
//     nombre: "Guerra Biológica",
//     descripcion: "Efectivo contra tu vecino molesto.",
//     codigo: "GB398",
//     stock: 10,
//     precio: 800000000,
//     thumbnail: "https://cdn3.iconfinder.com/data/icons/finance-152/64/9-256.png",
// });

// productosDao.agregar({
//     nombre: "Soborno",
//     descripcion: "Funciona sin fallas, siempre y cuando no te enganchen.",
//     codigo: "S133",
//     stock: 15,
//     precio: 75000,
//     thumbnail: "https://cdn3.iconfinder.com/data/icons/finance-152/64/7-256.png",
// });

// productosDao.agregar({
//     nombre: "Manteca Brillante",
//     descripcion: "Es dura. No se recomienda comer.",
//     codigo: "MB078",
//     stock: 50,
//     precio: 150000,
//     thumbnail: "https://cdn3.iconfinder.com/data/icons/finance-152/64/29-256.png",
// });

// productosDao.agregar({
//     nombre: "Martillo Bromista",
//     descripcion: "Convierte a tus amigos en monedas de diez centavos sin esfuerzo.",
//     codigo: "MB120",
//     stock: 2,
//     precio: 700,
//     thumbnail: "https://cdn3.iconfinder.com/data/icons/finance-152/64/26-256.png",
// });
