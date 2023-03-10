import fs from 'fs'
export class CartManager {
  #products;
  #cart;
  #dirPath;
  #filePath;
  #fileSystem= fs
  constructor() {
    this.#cart = new Array();
    this.#dirPath = "./src";
    this.#filePath = this.#dirPath + "/cart.json";
    this.idCart=1; 
    
  }
  addCart = async (newCarts) => {
    let newCart = {
      products: []
    }
    
    try {
      await this.#fileSystem.promises.mkdir(this.#dirPath, { recursive: true });
      if (!this.#fileSystem.existsSync(this.#filePath)) {
        await this.#fileSystem.promises.writeFile(this.#filePath, "[]");
      }
      //leemos el archivo
       let cartFile = await this.#fileSystem.promises.readFile(
        this.#filePath,
        "utf-8"
      ); 
      
      console.info("Archivo JSON obtenido desde archivo: ");
      console.log(cartFile); 
       this.#cart = JSON.parse(cartFile);  
      
      console.log(JSON.stringify(this.#cart)); 

      while (this.#cart.some(cart => cart.idCart === this.idCart)){
        this.idCart++;
    } 
    newCart.idCart = this.idCart;
      this.#cart.push(newCart);
      /* console.log("Lista actualizada de Productos: ");
      console.log(this.#cart); */
      //Se sobreescribe el archivo de usuarios para persistencia
      await this.#fileSystem.promises.writeFile(this.#filePath,JSON.stringify(this.#cart)
      );
    } catch (error) {
      console.error(
        `Error creando nuevo Carrito: ${JSON.stringify(newCart)}, detalle del error: ${error}`
      );
      throw Error(`Error consultando los productos por archivo, valide el archivo: ${this.#dirPath
      }, detalle del error: ${error}`);
    }
  };
   getCart = async () => {
    try {
      //Creamos el directorio
      await this.#fileSystem.promises.mkdir(this.#dirPath, { recursive: true });
      //Validamos que exista ya el archivo con usuarios sino se crea vacío para ingresar nuevos:
      if (!this.#fileSystem.existsSync(this.#filePath)) {
        //Se crea el archivo vacio.
        await this.#fileSystem.promises.writeFile(this.#filePath, "[]");
      }
      //leemos el archivo
      let cartFile = await this.#fileSystem.promises.readFile(this.#filePath,"utf-8");
      //Cargamos los usuarios encontrados para agregar el nuevo:
      //Obtenemos el JSON String
      console.info("Archivo JSON obtenido desde archivo: ");
      console.log(cartFile);
      this.#products = JSON.parse(cartFile);  
      console.log("Productos encontrados: ");
      /* console.log(this.#cart); */
      console.log(JSON.stringify(this.#products));
      return (this.#products)
      
    } catch (error) {
      console.error(`Error consultando el carrito por archivo, valide el archivo: ${
        this.#dirPath
      }, detalle del error: ${error}`);
      throw Error(`Error consultando el carrito por archivo, valide el archivo: ${this.#dirPath}
      ,detalle del error: ${error}`);
    }
  }; 

  getCartById = async (idCart)=>{
    try{
      await this.#fileSystem.promises.mkdir(this.#dirPath, { recursive: true });
      if (!this.#fileSystem.existsSync(this.#filePath)) {
        await this.#fileSystem.promises.writeFile(this.#filePath, "[]");
      }
      let cartFile = await this.#fileSystem.promises.readFile(
        this.#filePath,
        "utf-8");
        console.info("Archivo JSON obtenido desde archivo: ");
        console.log('--------------------------------------');
        console.log(cartFile);
          this.#cart = JSON.parse(cartFile);
          console.log("Productos encontrados: ");
          console.log(this.#cart); 
          const cartId = this.#cart.find(c => c.idCart == idCart);
          if(cartId){
              return cartId
          }else{
              console.error("El cart no existe")
          }
    }catch (error){
      console.error("Error al consultar los carts");
            throw Error(`Error al consultar los carts, detalle del error ${error}`);
    }
      
      }

      añadirCart = async(prodId,quantity, pos)=>{
        try{
          await this.#fileSystem.promises.mkdir(this.#dirPath, { recursive: true });
          if (!this.#fileSystem.existsSync(this.#filePath)) {
            await this.#fileSystem.promises.writeFile(this.#filePath, "[]");
          }
          let cartFile = await this.#fileSystem.promises.readFile(
            this.#filePath,
            "utf-8");
            console.info("Archivo JSON obtenido desde archivo: ");
            console.log('--------------------------------------');
            console.log(cartFile);
              this.#cart = JSON.parse(cartFile);
              console.log("Productos encontrados: ");
              console.log(JSON.stringify(this.#cart)); 

              let cart = this.#cart[pos]
              console.log('MOSTRANDO CART: ');
              console.log(cart);
        const productPosition = cart.products.findIndex(p => p.prodId === prodId)
        console.log(productPosition);
        
        if(productPosition <0){
            let product = {
                prodId: prodId,
                quantity: 1
            }
            this.#cart[pos].products.push(product)
        }else{
            
            this.#cart[pos].products[productPosition].quantity = quantity++
        }

        await this.#fileSystem.promises.writeFile(this.#filePath, JSON.stringify(this.#cart));
          }catch (error){
            console.error("Error al consultar los carts");
                  throw Error(`Error al consultar los carts, detalle del error ${error}`);
          }
          }
      
      
  
}

