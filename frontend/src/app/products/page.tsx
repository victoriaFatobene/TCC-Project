import { useEffect, useState, useContext } from "react";
import { api } from "../../services/api";
import { Product } from "../../lib/order.type";
import { CartContext } from "../../providers/cart";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1>Produtos</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map(prod => (
          <div key={prod.id} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
            <h2>{prod.title}</h2>
            <p>{prod.description}</p>
            <p>R$ {prod.price}</p>
            <button onClick={() => addToCart({ ...prod, quantity: 1 })}>Adicionar ao carrinho</button>
          </div>
        ))}
      </div>
    </div>
  );
}
