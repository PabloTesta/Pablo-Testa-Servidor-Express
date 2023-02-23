
import fs from 'fs'
export class ProductManager {
  #products;
  #dirPath;
  #filePath;
  #fileSystem= fs
  constructor() {
    this.#products = new Array();
    this.#dirPath = "./src";
    this.#filePath = this.#dirPath + "/products.json";
    
  }
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    let nuevoProducto = new Productos(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    
    try {
      await this.#fileSystem.promises.mkdir(this.#dirPath, { recursive: true });
      if (!this.#fileSystem.existsSync(this.#filePath)) {
        await this.#fileSystem.promises.writeFile(this.#filePath, "[]");
      }
      //leemos el archivo
       let productsFile = await this.#fileSystem.promises.readFile(
        this.#filePath,
        "utf-8"
      ); 
      //Cargamos los usuarios encontrados para agregar el nuevo
      //obtenemos el JSON string
       console.info("Archivo JSON obtenido desde archivo: ");
      console.log(productsFile); 
       this.#products = JSON.parse(productsFile);  // notar que aquí puede ser el error que indica el profe..
      /* console.log("Productos encontrados: ");
      console.log(this.#products); */
      this.#products.push(nuevoProducto);
      /* console.log("Lista actualizada de Productos: ");
      console.log(this.#products); */
      //Se sobreescribe el archivo de usuarios para persistencia
      await this.#fileSystem.promises.writeFile(this.#filePath,JSON.stringify(this.#products)
      );
    } catch (error) {
      console.error(
        `Error creando nuevo Producto: ${JSON.stringify(
          nuevoProducto
        )}, detalle del error: ${error}`
      );
      throw Error(`Error consultando los productos por archivo, valide el archivo: ${this.#dirPath
      }, detalle del error: ${error}`);
    }
  };
   getProducts = async () => {
    try {
      //Creamos el directorio
      await this.#fileSystem.promises.mkdir(this.#dirPath, { recursive: true });
      //Validamos que exista ya el archivo con usuarios sino se crea vacío para ingresar nuevos:
      if (!this.#fileSystem.existsSync(this.#filePath)) {
        //Se crea el archivo vacio.
        await this.#fileSystem.promises.writeFile(this.#filePath, "[]");
      }
      //leemos el archivo
      let productsFile = await this.#fileSystem.promises.readFile(this.#filePath,"utf-8");
      //Cargamos los usuarios encontrados para agregar el nuevo:
      //Obtenemos el JSON String
      console.info("Archivo JSON obtenido desde archivo: ");
      console.log(productsFile);
      this.#products = JSON.parse(productsFile);  
      console.log("Productos encontrados: ");
      console.log(this.#products);
      return (productsFile)
      
    } catch (error) {
      console.error(`Error consultando los productos por archivo, valide el archivo: ${
        this.#dirPath
      }, detalle del error: ${error}`);
      throw Error(`Error consultando los productos por archivo, valide el archivo: ${this.#dirPath}
      ,detalle del error: ${error}`);
    }
  }; 

  getProductsById = async (id)=>{
    let productsFile = await this.#fileSystem.promises.readFile(
      this.#filePath,
      "utf-8");
      console.info("Archivo JSON obtenido desde archivo: ");
      console.log('--------------------------------------');
      console.log(productsFile);
        this.#products = JSON.parse(productsFile);
      console.log("Productos encontrados: ");
      /*console.log(this.#products); */ 
      const producto = this.#products.filter(producto=>producto.id===id);
      if(producto.length>0){
        console.log(`El producto encontrado con el codigo ${id} es :`);
        console.log(producto);
      } else{
        console.error('el producto Buscado con ese id no existe');
      }
  }
  updateProductById= async(id,nuevoProducto)=>{
    await this.getProducts();
    const updateProducts= this.#products.map((prod)=>{
      if(prod.id===id){
        return {...prod,...nuevoProducto}
      }else {
        return prod
      }

    })
    this.#products=updateProducts;
    this.#fileSystem.promises.writeFile(this.#filePath,JSON.stringify(this.#products));
    console.log(this.#products);
  }

  deleteProduct= async(id)=>{
    let productsFile = await this.#fileSystem.promises.readFile(
      this.#filePath,
      "utf-8");
      console.info("Archivo JSON obtenido desde archivo: ");
      console.log('--------------------------------------');
      console.log(productsFile);
      this.#products = JSON.parse(productsFile);
      console.log("Productos encontrados: ");
      console.log(this.#products);

    let deleteProd= this.#products.find((prod)=>prod.id===id)
    console.log(deleteProd);
    if(deleteProd){
      const posicion=this.#products.indexOf(deleteProd);
      this.#products.splice(posicion,1);
      console.log("Se eliminó el producto");
      console.log('-------------------------');
      this.#fileSystem.promises.writeFile(this.#filePath,JSON.stringify(this.#products));
    console.log(this.#products);
      console.log(this.#products);

    }else{
      console.log('No se pudo eliminar el producto');
    }
  }
  updatedJson=async()=>{
    this.#fileSystem.promises.writeFile(this.#filePath,JSON.stringify(this.#products))
  }
}

class Productos {
   static id=0 
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
     this.id=Productos.id++ 
    this.code = code;
    this.stock = stock;
  }
}

let productManager = new ProductManager(); 
/* productManager.getProducts(); 
 productManager.addProduct("Producto prueba","Esto es un producto prueba",200,"sin imagen","abc123",25); 
  */
/* productManager.getProducts() ; */

/*  productManager.getProductsById(0); */
/*
productManager.updateProductById(0,{title:"fanta"});

productManager.deleteProduct(0); */  



