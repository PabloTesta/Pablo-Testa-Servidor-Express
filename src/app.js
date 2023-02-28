import express from 'express';
import productsRouter from './routes/products.Router.js'
import cartsRouter from './routes/cart.Router.js'
const app = express();//Express es el módulo ya instalado, sin embargo, para poder tener andando nuestra app, debemos inicializar el módulo "express" con la siguiente linea...
const SERVER_PORT= 8080;
app.use(express.json())
app.use(express.urlencoded({extended:true}))// ahora usando querys, una vez escrita la linea que nos permite usar querys //esta nos permitirá utilizar url's mas complicadas y que el node no nos salte con errors

app.use('api/products',productsRouter);
app.use('api/cart',cartsRouter);

app.listen(SERVER_PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${SERVER_PORT}`);
});