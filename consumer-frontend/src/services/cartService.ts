import storageService from "./storageService";
import { CartItemModel } from "../models/cartModel";
import { ProductDisplayModel } from "@/models/productModel";
import { reactive } from "vue";

const storageKeyName = "shoppingCart";

/**
 * 將資料加到Session Storage
 * @param items 購物車商品
 */
function updateToSessionStorage(items: CartItemModel[]) {
    const value = JSON.stringify(items);

    sessionStorage.setItem(storageKeyName, value);
}

/**
 * 從Session Storage取得購物車暫存資料
 * @returns 商品列表
 */
function getItemsFromSessionStorage(): CartItemModel[] {
    const sessionValue = storageService.getSessionStorageValue(storageKeyName);

    if (!sessionValue) {
        return [];
    }

    const items: CartItemModel[] = JSON.parse(sessionValue);

    return items;
}

/**
 * 取得購物車內商品數量
 * @returns 購物車內商品數量
 */
function getItemCount() {
    const items = getItemsFromSessionStorage();

    return items.length;
}

export const cart = reactive({
    count: getItemCount(),

    /**
     * 取得購物車暫存資料
     * @returns 商品列表
     */
    getItems(): CartItemModel[] {
        return getItemsFromSessionStorage();
    },

    /**
     * 取得購物車內商品數量
     * @returns 購物車內商品數量
     */
    getItemCount() {
        return getItemCount();
    },

    /**
     * 加入購物車
     * @param product 商品
     * @param quantity 數量
     */
    add(product: ProductDisplayModel, quantity: number) {
        const items = this.getItems();

        // 已存在，不再加入
        const existedItem = items.find(val => {
            return val.productGuid === product.guid;
        });
        if (existedItem) {
            return;
        }

        const maxItemNo: number = items.reduce(function (previousValue, currentValue) {
            return Math.max(previousValue, currentValue.itemNo); // 比較前後值，回傳大的值
        }, 0);

        const newItem: CartItemModel = {
            itemNo: maxItemNo + 1,
            productGuid: product.guid,
            productTitle: product.title,
            productPrice: product.price,
            quantity: quantity,
            amount: product.price * quantity
        };

        items.push(newItem);

        updateToSessionStorage(items);
        this.count = getItemCount();
    },

    /**
     * 移除
     * @param productGuid 商品Guid
     */
    remove(productGuid: string) {
        const items = this.getItems();
        const itemIndex = items.findIndex(val => {
            return val.productGuid === productGuid;
        });

        if (itemIndex < 0) {
            return;
        }

        items.splice(itemIndex, 1);
        updateToSessionStorage(items);
        this.count = getItemCount();
    },

    /**
     * 更新指定商品的數量
     * @param productGuid 商品Guid
     * @param quantity 數量
     * @returns 
     */
    updateQuantity(productGuid: string, quantity: number) {
        const items = this.getItems();
        const itemIndex = items.findIndex(val => {
            return val.productGuid === productGuid;
        });

        if (itemIndex < 0) {
            return;
        }

        items[itemIndex].quantity = quantity;
        items[itemIndex].amount = quantity * items[itemIndex].productPrice;

        updateToSessionStorage(items);
    }
})