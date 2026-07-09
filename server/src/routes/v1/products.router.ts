import { Router } from "express";
import { productController } from "../../controllers/products.controller";

const productsRouter = Router()


productsRouter.get("/all", productController.getAllProducts)
productsRouter.post("/", productController.create)

productsRouter.post("/checkout/create-session",, productController.checkout)


export default productsRouter