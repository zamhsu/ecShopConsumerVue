export interface PaymentMethodModel {
    id: number,
    name: string
}

export interface SendPaymentModel {
    orderGuid: string,
    paymentMethodId: 1 | 2
}