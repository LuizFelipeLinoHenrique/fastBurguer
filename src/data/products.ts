import { Product } from "../types";

export const products: Product[] = [
    // --- BURGERS ---
    {
        id: "1",
        name: "Fast Classic",
        description:
            "Hambúrguer artesanal de 160g, queijo cheddar fatiado, alface, tomate fresco e molho especial da casa.",
        price: 24.9,
        category: "burgers",
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    },
    {
        id: "2",
        name: "Bacon Supreme",
        description:
            "Hambúrguer artesanal, queijo cheddar, tiras crocantes de bacon fumado, cebola roxa e molho barbecue.",
        price: 29.9,
        category: "burgers",
        image:
            "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=800",
    },
    {
        id: "3",
        name: "Cheese Salad",
        description:
            "Hambúrguer artesanal suculento, queijo mussarela derretido, alface crocante, tomate e maionese verde.",
        price: 26.9,
        category: "burgers",
        image:
            "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800",
    },
    {
        id: "4",
        name: "Double Cheddar Monster",
        description:
            "Dois hambúrgueres artesanais de 150g, cheddar cremoso duplo, bacon crocante e molho especial no pão brioche.",
        price: 36.9,
        category: "burgers",
        image:
            "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800",
    },
    {
        id: "5",
        name: "Chicken Crispy",
        description:
            "Filé de frango empanado super crocante, queijo prato, alface americana fresca e maionese temperada.",
        price: 25.9,
        category: "burgers",
        image:
            "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=800",
    },
    {
        id: "6",
        name: "Smash Gorgonzola",
        description:
            "Dois hambúrgueres prensados smash, creme de queijo gorgonzola, cebola caramelizada e rúcula fresca.",
        price: 31.9,
        category: "burgers",
        image:
            "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
    },
    {
        id: "7",
        name: "Veggie Delight",
        description:
            "Hambúrguer de grão-de-bico com cogumelos, queijo vegano, alface, tomate e maionese vegetal de ervas.",
        price: 27.9,
        category: "burgers",
        image:
            "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800",
    },

    // --- ACOMPANHAMENTOS ---
    {
        id: "8",
        name: "Batata Frita Tradicional",
        description:
            "Porção generosa de batatas fritas crocantes por fora e macias por dentro, temperadas com sal especial.",
        price: 12.9,
        category: "acompanhamentos",
        image:
            "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800",
    },
    {
        id: "9",
        name: "Batata Cheddar & Bacon",
        description:
            "Batatas fritas douradas cobertas com molho cheddar cremoso quente e pedaços crocantes de bacon.",
        price: 18.9,
        category: "acompanhamentos",
        image:
            "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800",
    },
    {
        id: "10",
        name: "Onion Rings",
        description:
            "Anéis de cebola empanados e fritos até ficarem bem dourados e crocantes.",
        price: 14.9,
        category: "acompanhamentos",
        image:
            "https://images.unsplash.com/photo-1639024471283-03518883512d?w=800",
    },
    {
        id: "11",
        name: "Nuggets de Frango (8 un)",
        description:
            "8 empanados de peito de frango crocantes, acompanhados de molho barbecue da casa.",
        price: 16.9,
        category: "acompanhamentos",
        image:
            "https://images.unsplash.com/photo-1562967914-608f82629710?w=800",
    },
    {
        id: "12",
        name: "Coxinha de Frango (6 un)",
        description:
            "6 mini coxinhas salgadas crocantes com recheio cremoso de frango com catupiry.",
        price: 15.9,
        category: "acompanhamentos",
        image:
            "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800",
    },

    // --- BEBIDAS ---
    {
        id: "13",
        name: "Coca-Cola 350ml",
        description: "Refrigerante Coca-Cola lata 350ml trincando de gelada.",
        price: 6.9,
        category: "bebidas",
        image:
            "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800",
    },
    {
        id: "14",
        name: "Guaraná Antarctica 350ml",
        description:
            "Refrigerante Guaraná Antarctica lata 350ml servido bem gelado.",
        price: 6.9,
        category: "bebidas",
        image:
            "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800",
    },
    {
        id: "15",
        name: "Milkshake Chocolate",
        description:
            "Milkshake ultra cremoso de chocolate belga topping de chantilly e calda rica.",
        price: 16.9,
        category: "bebidas",
        image:
            "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800",
    },
    {
        id: "16",
        name: "Milkshake Morango",
        description:
            "Milkshake artesanal preparado com sorvete de baunilha e morangos frescos.",
        price: 16.9,
        category: "bebidas",
        image:
            "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800",
    },
    {
        id: "17",
        name: "Suco de Laranja 500ml",
        description:
            "Suco 100% natural de laranja espremida na hora, 500ml bem gelado.",
        price: 9.9,
        category: "bebidas",
        image:
            "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800",
    },
    {
        id: "18",
        name: "Água Mineral 500ml",
        description: "Garrafa de água mineral sem gás 500ml.",
        price: 4.5,
        category: "bebidas",
        image:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800",
    },

    // --- SOBREMESAS ---
    {
        id: "19",
        name: "Brownie Supremo",
        description:
            "Brownie aquecido de chocolate amargo servido com generosa calda de chocolate e pedaços de nozes.",
        price: 13.9,
        category: "sobremesas",
        image:
            "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800",
    },
    {
        id: "20",
        name: "Grand Gateau",
        description:
            "Petit gateau quente recheado com chocolate derretido, acompanhado de picolé e calda de morango.",
        price: 22.9,
        category: "sobremesas",
        image:
            "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800",
    },
    {
        id: "21",
        name: "Torta de Limão",
        description:
            "Fatia de torta artesanal de limão com base crocante de biscoito e merengue tostado no maçarico.",
        price: 14.9,
        category: "sobremesas",
        image:
            "https://images.unsplash.com/photo-1519869325930-281384150729?w=800",
    },
    {
        id: "22",
        name: "Churros Doce de Leite (4 un)",
        description:
            "4 mini churros crocantes passados no açúcar e canela, servidos com doce de leite cremoso.",
        price: 15.9,
        category: "sobremesas",
        image:
            "https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=800",
    },
];