import { CouponSimpleModel } from "@/models/couponModel";
import { RequestData } from "@/models/requestData";
import { ResponseData } from "@/models/responseData";
import axios from "@/utils/http";
import { stringUtils } from "@/utils/stringUtils";

export default {
    /**
     * 取得檢查可用性結果
     * @param couponCode 優惠券代碼
     * @returns 
     */
     async getCheckResult(couponCode: string): Promise<ResponseData<CouponSimpleModel>> {
        const requestData: RequestData<string> = {
            data: couponCode,
            timeZone: stringUtils.getClientTimeZone()
        }

        const { data } = await axios.post("coupon/check", requestData);

        return data;
    },
}