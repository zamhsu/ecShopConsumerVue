import { PaginationModel } from "./PaginationModel";

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

export interface OrderItemDetailModel {
    itemNo: number,
    productGuid: string,
    productName: string,
    quantity: number,
    total: number
}

export interface OrderCouponDetailModel {
    itemNo: number,
    couponCode: string,
    quantity: number,
    total: number
}

export interface SingleOrderModel {
    guid: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    total: number,
    paymentMethodId: number | null,
    paymentMethodString: string | null,
    paidDate: Date | null,
    statusId: number,
    statusString: string,
    createDate: Date,
    orderDetails: OrderItemDetailModel[],
    couponDetail: OrderCouponDetailModel | null;
}

export interface CustomerOrderModel {
    orderDisplays: SingleOrderModel[],
    pagination: PaginationModel
}