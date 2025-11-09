export interface OrderItem {
    id: string,
    name: string,
    description?: string,
    cost: number,
    rejected?: boolean
    count: number
}