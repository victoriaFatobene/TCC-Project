import { useContext } from "react";
import { CartContext } from "../../providers/cart";
import { OrderContext } from "../../providers/order";
import { api } from "../../services/api";
import type { CartItem, Order } from "../../lib/order.type";

export default function PaymentPage() {
  const { cartItems, clearCart } = useContext(CartContext) as { cartItems: CartItem[]; clearCart: () => void };
  const { addOrder } = useContext(OrderContext) as { addOrder: (order: Order) => void };

  const handlePayment = async () => {
    const orderData: Omit<Order, "id"> = {
      items: cartItems,
      total: cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
      status: "paid"
    };
    await api.post("/orders", orderData);
    addOrder(orderData as Order);
    clearCart();
    alert("Pedido realizado com sucesso!");
  };

  return (
    <div>
      <h1>Pagamento</h1>
      <button onClick={handlePayment}>Pagar agora</button>
    </div>
  );
}
