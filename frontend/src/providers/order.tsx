import { createContext, useState, ReactNode } from "react";
import { Order } from "../lib/order.type";

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
};

export const OrderContext = createContext<OrderContextType>({} as OrderContextType);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => setOrders([...orders, order]);

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
