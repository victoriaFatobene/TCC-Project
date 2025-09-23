// Tipos de produto, item do carrinho e pedido
export type Product = {
  id: string;
  title: string;
  description?: string;
  price: number;
  image?: string;
};

export type CartItem = Product & { quantity: number };

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'delivered';
};
