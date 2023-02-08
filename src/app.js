import {ProductManager} from './productManager1.js'
import express from 'express';

const app = express();//Express es el módulo ya instalado, sin embargo, para poder tener andando nuestra app, debemos inicializar el módulo "express" con la siguiente linea...
const SERVER_PORT= 8080;
app.use(express.json())
app.use(express.urlencoded({extended:true}))// ahora usando querys, una vez escrita la linea que nos permite usar querys //esta nos permitirá utilizar url's mas complicadas y que el node no nos salte con errors

let productManager= new ProductManager()
// a partir de aquí nuestra app contendrá todas las funcionalidades de express..
  
    app.get('/products/query',(request,response)=>{
        let limit = request.query;
        const prod = productManager.getProducts() ;
        if(limit){
            function limitar(prod,limite){
                return prod.slice(0,limite)
            }
            response.send(limitar(prod,1))
        }
        response.send(prod)
     
    });

    app.get('/products/:userId',(request,response)=>{
        const prod = productManager.getProductById(request.params.userId);
        if(prod){
            response.send(JSON.stringify(prod));
        }
        response.send({message:"El producto con ese ID no se encuentra"})
    })




   
   

app.listen(SERVER_PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${SERVER_PORT}`);
});  