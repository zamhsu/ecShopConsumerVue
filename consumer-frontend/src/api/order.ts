import { CustomerInfoModel, OrderDetailModel, PlaceOrderModel } from "@/models/orderModel";
import { RequestData } from "@/models/requestData";
import { ResponseData } from "@/models/responseData";
import axios from "@/utils/http";
import { stringUtils } from "@/utils/stringUtils";

export default {
    /**
     * 建立訂單
     * @param customerInfo 收件人資料
     * @param items 商品資料
     * @param couponCode 優惠券代碼
     * @returns 
     */
    async placeOrder(customerInfo: CustomerInfoModel, items: OrderDetailModel[], couponCode: string): Promise<ResponseData<string>> {
        const order: PlaceOrderModel = {
            order: customerInfo,
            orderDetailModels: items,
            couponCode: couponCode
        };

        const requestData: RequestData<PlaceOrderModel> = {
            data: order,
            timeZone: stringUtils.getClientTimeZone()
        }

        const { data } = await axios.post("order/place", requestData);

        return data;
    },
}