/**
 * 購物車
 */
export interface CartItemModel {
    itemNo: number,
    productGuid: string,
    productTitle: string,
    productPrice: number,
    quantity: number,
    amount: number,
}