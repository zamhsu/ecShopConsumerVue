import { CustomerInfoModel } from "@/models/orderModel";
import storageService from "./storageService";

const storageKeyName = "orderCustomerInfo";

/**
 * 將資料加到Session Storage
 * @param info 個人資料
 */
function updateToSessionStorage(info: CustomerInfoModel) {
    const value = JSON.stringify(info);

    sessionStorage.setItem(storageKeyName, value);
}

/**
 * 從Session Storage取得個人資料暫存資料
 * @returns 商品列表
 */
function getInfoFromSessionStorage(): CustomerInfoModel | null {
    const sessionValue = storageService.getSessionStorageValue(storageKeyName);

    if (!sessionValue) {
        return null;
    }

    const info: CustomerInfoModel = JSON.parse(sessionValue);

    return info;
}

/**
 * 從Session Storage移除個人資料
 */
function removeFromSessionStorage() {
    storageService.removeSessionStorageValue(storageKeyName);
}

export default {
    /**
     * 取得訂單個人資料
     * @returns 
     */
    getCustomerInfo(): CustomerInfoModel | null {
        const info = getInfoFromSessionStorage();

        return info;
    },

    /**
     * 設定訂單個人資料
     * @param info 個人資料
     */
    setCustomerInfo(info: CustomerInfoModel) {
        updateToSessionStorage(info);
    },

    /**
     * 移除個人資料
     */
    removeCustomerInfo() {
        removeFromSessionStorage();
    }
}