import {Router} from 'express'
import { ProductManager } from '../productManager1.js'
const router = Router();

const productManager= new ProductManager();


let persisitirUsuario= async (response)=>{
    try{
        await productManager.addProduct("Producto prueba","Esto es un producto prueba",200,"sin imagen","abc123",25); 
        console.log('Creando Usuario');
        let prod= await productManager.getProducts();
        console.log('llamando a consultar usuarios');
        console.log('haciendo STRINGIFY');
        console.log(prod);
        return prod
    }catch{
        response.status(400).send('Error guardando usuario');
    }
  }
  router.get ('/', async (request,response)   => {
    console.log('Llamando a crear usuario');
    let result = await persisitirUsuario(response);
    console.log('REsolviendo Promesa');
    console.log(result);
    response.send(result)
    /* let {limit} = request.query; 
     const prod = productManager.getProducts() || []; 
         if(limit){
            function limitar(prod,limite){
                return prod.slice(0,limite)
            }
            response.send(limitar(prod,1))
        }  */
     
    });

     router.get('/:prodId',(request,response)=>{
        const prod = productManager.getProductById(request.params.userId);
        if(prod){
            response.send(JSON.stringify(prod));
        }
        response.send({message:"El producto con ese ID no se encuentra"})
    })
 
export default router;