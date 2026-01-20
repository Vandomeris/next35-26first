'use client'

import ProductAdminCard from "@/components/ProductAdminCard"
import { useEffect, useState } from "react"

export default function ProductsPage() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getProducts() {
            const resp = await fetch('/api/products')
            const data = await resp.json()
            setProducts(data)
        }
        getProducts()
    }, [])

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')

    async function createProduct(e) {
        e.preventDefault()

        const resp = await fetch('/api/products', {
            method: 'post',
            body: JSON.stringify({
                title: title,
                price: price
            })
        })
        const data = await resp.json()
        if (data.status === 'success') {
            setTitle('')


            setProducts(
                [
                    ...products,
                    {
                        title: data.message.title,
                        price: data.message.price,
                        id: data.message.id,
                    }
                ]

            )
        }
        console.log(data)
    }



    return (
        <div>
            <h1>Products List</h1>


            <div>
                <h2>Создать товар</h2>
                <form className="flex justify-center gap-x-10 mb-5" onSubmit={(e) => createProduct(e)}>
                    <input className="px-4 py-2 border-2 border-gray-500 rounded-lg w-75" value={title} onInput={(e) => setTitle(e.target.value)} type="text" placeholder="Введите название товара" />
                    <input className="px-4 py-2 border-2 border-gray-500 rounded-lg w-75" value={price} onInput={(e) => setPrice(e.target.value)} type="text" placeholder="Введите цену товара" />
                    <button className="px-2 py-1 bg-purple-600 rounded-lg text-white">Создать</button>
                </form>
            </div>

            <div className="grid grid-cols-5 gap-4">
                {
                    products.map(product => (
                        <ProductAdminCard product={product} key={product.id} setProducts={setProducts} />
                    ))
                }
            </div>



        </div>
    )
}
