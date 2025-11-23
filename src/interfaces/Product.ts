// Интерфейсы для работы с товарами

export interface Product {
    id: number;
    article: string;
    name: string;
    price: number;
    quantity: number;
    created_at?: string;
    updated_at?: string;
}

export interface ProductAdd {
    article: string;
    name: string;
    price: number;
    quantity: number;
}

export interface CartItem {
    article: string;
    name: string;
    price: number;
    quantity: number;
}

export interface SaleRequest {
    items: {
        article: string;
        quantity: number;
    }[];
}

export interface SaleResponse {
    items: {
        article: string;
        name: string;
        price: number;
        quantity: number;
        total: number;
    }[];
    total_price: number;
}
