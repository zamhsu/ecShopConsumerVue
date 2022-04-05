export interface CustomerInfoModel {
    name: string,
    email: string,
    phone: string,
    address: string
}

export interface OrderDetailModel {
    productId: number,
    productGuid: string,
    price: number,
    quantity: number
}

export interface PlaceOrderModel {
    order: CustomerInfoModel,
    orderDetailModels: OrderDetailModel[],
    couponCode: string
}