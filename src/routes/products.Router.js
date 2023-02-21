import {Router} from 'express'
import { ProductManager } from '../productManager1.js'
const router = Router();

const productManager= new ProductManager();


router.post('/product',async(request,response )=>{
    let user=request.body;//lo que llegue, llegará como un JSON en el body 
 await productManager.addProduct("Producto prueba cuatro","Esto es un producto prueba",200,"sin imagen","abc123",32); 

console.log(users);
response.status(200).send({status:'Success',message:`Todo salío bien, el cliente envió la petición, es decir, hizo un request, envió el user/usuario en el correspondiente body, llegó en un JSON porque nosotros se lo forzamos desde postman y lo pusheamos a nuestro arreglo `})
})

router.get('/api/products',async(request,response)=>{
    console.log('Consumiendo api GET /api/users...');
    console.log('Usuarios actuales: ');
    users= await productManager.getProducts();
    console.log(JSON.parse(users));
    console.log('ahora mandamos el arreglo de usuarios a traves de un RESPONSE al cliente que lo solicita a traves del método GET. Notar que SE LO MANDAMOS con un RESPONSE, esta vez no es un REQUEST, el único que usa request es el cliente para con el servidor y manda lo que tiene que mandar en un BODY. ');

    response.status(200).send(users);
    });
    router.get('/api/products/:productId',async(request,response)=>{
        
        console.log(request.params);
        let userId=parseInt(request.params.userId)
        const products= await productManager.getProducts();
        console.log(JSON.parse(products));
        const productId= products.find(u=>u.id===userId)
        
        console.log('mostrando el usuario encontrado: ');
        console.log(JSON.stringify(users[productId]))
        if(productId){
            response.status(200).send(users[productId])
        }else{
        response.status(400).send({error:400,message:"No existe un producto con ese id"})
        }
    });
    router.delete('/api/product/:userId', (request,response)=>{
        console.log('-------------Consumiendo api DELETE /api/user..---------------');
        console.log(request.params);
        let userId=parseInt(request.params.userId);
        console.log(`Buscando Usuario a eliminar por ${request.params}`);
        const usersSize=users.length;
        const userPosition= users.findIndex((u=>u.id===userId))
        if(userPosition<0){
            return response.status(202).send({status:'info', error:'Usuario no encontrado'});
        }
        console.log('Usuario encontrado para eliminar');
        console.log(users[userPosition]);
        users.splice(userPosition,1);
        if(users.length===usersSize){
            return response.status(500).send({status:"error",message:"El servidor no pudo borrar el usuario"})
        }
        return response.send({status:"Success",message:"Usuario Eliminado"});
    })
export default router;