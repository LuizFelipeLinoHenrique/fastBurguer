export type Category =
    | "burgers"
    | "acompanhamentos"
    | "bebidas"
    | "sobremesas";

export type PaymentMethod = "PIX" | "Cartão" | "Dinheiro";

export type OrderStatus = "Em preparo" | "Entregue";

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
    image: string;
};

export type CartItem = {
    product: Product;
    quantity: number;
};

export type Order = {
    id: string;
    orderNumber: string;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
    address: string;
    paymentMethod: PaymentMethod;
    createdAt: number; // Date.now() timestamp
    status: OrderStatus;
};