import { ProductPagedDisplayModel } from "@/models/productModel";
import { ResponseData } from "@/models/responseData";
import axios from "@/utils/http";

export default {
    /**
     * 取得分頁後的產品資料
     * @param pageSize 資料筆數，預設10
     * @param page 頁數，預設1
     * @returns 
     */
    async getPaged(pageSize = 10, page = 1): Promise<ResponseData<ProductPagedDisplayModel>> {
        const { data } = await axios.get(`product?pageSize=${pageSize}&page=${page}`);

        return data;
    },
}