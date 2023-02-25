import {Router} from 'express' 
import { ProductManager } from '../productManager1.js'
import { CartManager } from '../cartManager.js'

const router = Router();
const cartManager= new CartManager();
const productManager= new ProductManager();

router.post("/", async (request, response) =>{
    const newCart = request.body;
    try{
        
        await cartManager.addCart(newCart)
        response.status(201).send({message: "Cart creado con éxito!"});
    } catch(error){
        console.log("Error al guardar el cart. Error: " + error); 
        response.status(500).send({error: "Error al guardar el cart", message: error});
    }
});

router.get("/:cartId", async (request, response) =>{
    const cart = await cartManager.getCart();
    const cartId = cart.find(c => c.idCart == request.params.cartId);
    if(cartId){
        response.send(JSON.stringify(cartId));
    }else{
        response.status(400).send({error: "400", message: "El id ingresado es inválido o no existe"});
    }
});

router.post("/:cartId/product/:prodId", async (request, response) =>{

    const prodId = parseInt(request.params.prodId);
    const cartId = parseInt(request.params.cartId);

    const prod = await productManager.getProducts();
    const cart = await cartManager.getCarts();

    const body = request.body;

    let quantity = parseInt(body["quantity"])

    const productPosition = prod.findIndex(p => p.id == prodId)
    const cartPosition = cart.findIndex(c => c.idCart == cartId)

    if(cartPosition < 0){
        return response.status(400).send({status: "info", message: "Cart no encontrado"})
    }

    if(productPosition < 0){
        return response.status(400).send({status: "info", message: "Product no encontrado"})
    }

    cartManager.añadirCart(cartId, prodId, quantity, cartPosition)
    return response.send({status: "Success", message: "Carrito Actualizado.", data: cart[cartPosition]});
})

export default router; 