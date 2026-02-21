export interface CartItem{
    productId:number,
    title:string,
    price:number,
    qty:number
}

export interface cartState{
    items:CartItem[]
}