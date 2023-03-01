import {Router} from 'express'
import { ProductManager } from '../productManager1.js'
const router = Router();

const productManager= new ProductManager();


router.post('/',async(request,response )=>{
let productoAgregado=request.body;//lo que llegue, llegará como un JSON en el body 
console.log(productoAgregado);
await productManager.addProduct(productoAgregado.title,productoAgregado.description,productoAgregado.price,productoAgregado.thumbnail,productoAgregado.code,productoAgregado.stock)
response.status(200).send({status:'Success',message:`Todo salío bien, el cliente envió la petición, es decir, hizo un request, envió el user/usuario en el correspondiente body, llegó en un JSON porque nosotros se lo forzamos desde postman y lo pusheamos a nuestro arreglo `})
})

router.get('/',async(request,response)=>{
    console.log('Consumiendo api GET /api/users...');
    console.log('Usuarios actuales: ');
    let products= await productManager.getProducts();
    console.log(JSON.parse(products));
    console.log('ahora mandamos el arreglo de productos a traves de un RESPONSE al cliente que lo solicita a traves del método GET. Notar que SE LO MANDAMOS con un RESPONSE, esta vez no es un REQUEST, el único que usa request es el cliente para con el servidor y manda lo que tiene que mandar en un BODY. ');

    response.status(200).send(products); 
    });
    router.get('/:productId',async(request,response)=>{
        
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
    router.delete('/:productId',async (request,response)=>{
        console.log(request.params);
        let Id=parseInt(request.params.productId)
        console.log(Id);
         productManager.deleteProduct(Id);
         return response.send('Usuario eliminado')
        });

        router.put('/:productId',async(request,response)=>{
            console.log('---------Consumiendo api PUT /api/user..-------');
            console.log(request.params);
            let Id=parseInt(request.params.productId)
            const products= JSON.parse(await productManager.getProducts());
            let userUpdated = request.body;//No entiendo bien que hace acá. Trae el usuario que creamos con POST? 
            console.log('Mostrando  que es request.body que traemos: ');
            console.log(request.body);
            console.log(`Buscando usuario a modificar en la siguiente linea con el id:  ${Id}`);
            const userPosition= products.findIndex((u=>u.id===Id))
            console.log('mostrando el usuario encontrado: ');
            console.log(products[userPosition]);
            if(userPosition<0){
                return response.status(202).send({status:'info', error:'Usuario no encontrado'});
            }
            console.log('modificando Usuario');
            console.log(products[userPosition]);
            userUpdated.id=products[userPosition].id;
            console.log('-----------------');
            console.log(products[userPosition].id);
            products[userPosition]=userUpdated;
            console.log(userUpdated);
            console.log('Usuarios Actuales:------');
            console.log(products);
            //Notar que la linea de abajo quiero modificar el products.json, sin embargo me deja un array vacío 
            productManager.updatedJson(JSON.stringify(products));
            return response.send({status:"Success", message:"Usuario Encontrado y Actualizado"})
        
            });
export default router;