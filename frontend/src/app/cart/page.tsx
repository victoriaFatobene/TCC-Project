import { useContext } from "react";
import { CartContext } from "../../providers/cart";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Carrinho</h1>
      {cartItems.length === 0 && <p>Carrinho vazio</p>}
      {cartItems.map(item => (
        <div key={item.id} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
          <h2>{item.title}</h2>
          <p>Quantidade: {item.quantity}</p>
          <p>Preço: R$ {item.price * item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)}>Remover</button>
        </div>
      ))}
      {cartItems.length > 0 && (
        <>
          <h3>Total: R$ {total}</h3>
          <button onClick={clearCart}>Limpar carrinho</button>
        </>
      )}
    </div>
  );
}
