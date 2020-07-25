
interface SingleProd{
    name: string,
    metrics?: string[]
}

export interface ShoppingListModel {
    entities: { product: SingleProd, quantity: number, metrics: string }[],
}