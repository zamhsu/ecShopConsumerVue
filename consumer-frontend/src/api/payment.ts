import { PaymentMethodModel, SendPaymentModel } from "@/models/payment";
import { ResponseData } from "@/models/responseData";
import axios from "@/utils/http";

export default {
    /**
     * 取得付款方式資料
     * @returns 
     */
    async getPaymentMethods(): Promise<ResponseData<PaymentMethodModel[]>> {
        const { data } = await axios.get("payment/method");

        return data;
    },

    /**
     * 付款
     * @returns 
     */
    async payTheBill(payment: SendPaymentModel): Promise<ResponseData<boolean>> {
        let url = "";

        switch (payment.paymentMethodId) {
            case 1:
                // 信用卡
                url = "payment/creditCard";
                break;
            case 2:
                // ATM轉帳
                url = "payment/atm";
                break;
            default:
                break;
        }

        const { data } = await axios.post(url, payment);

        return data;
    },
}