export type Category =
    | "burgers"
    | "acompanhamentos"
    | "bebidas"
    | "sobremesas";

export type PaymentMethod = "PIX" | "Cartão" | "Dinheiro";

export type OrderStatus = "Preparando" | "A caminho" | "Entregue";

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