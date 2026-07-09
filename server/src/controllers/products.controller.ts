import { Request, Response } from "express";
import { productServices } from "../services/products.services";
import { it } from "node:test";
import pool from "../db";

class ProductController {
    async create(req: Request, res: Response) {
        const { name, description, imgUrl, price } = req.body

        if (!name || !description || !imgUrl || !price) {
            res.status(400).json({
                message: "validation failed"
            })
            return
        }

        const data = await productServices.create(req.body)

        if (!data) {
            res.status(500).json({
                message: "internal server error"
            })
            return
        }
        res.status(201).json({
            message: "successfully created products",
            productId: data.id
        })
    }

    async getAllProducts(req: Request, res: Response) {
        const data = await productServices.getAllProducts()

        if (!data) {
            res.status(500).json({
                message: "internal server error"
            })
            return
        }

        res.status(200).json({
            data
        })

    }
    async checkout(req: Request, res: Response) {
        const { items } = req.body;


        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        const productsIds = items.map(i => i.productId)

        const products = await productServices.findProductsById(productsIds)

        const line_items = products.map(item => {
            const product = products.find(p => p.id === item.id)

            if (!product) throw new Error("invalid products")

            return {
                price_data: {
                    currency: 'inr',
                    product_data: { name: product.name },
                    unit_amount: product.price
                },
                quantity: item.quantity
            }
        })

        const total = line_items.reduce((sum, li) =>
            li.price_data.unit_amount += sum
            , 0)

        const order_result = await pool.query("INSERT INTO orders (userId,productId,payment_method) VALUES $1$2$3", [req.use])

    }
}

export const productController = new ProductController()