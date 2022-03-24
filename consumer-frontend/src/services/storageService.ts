export default {
    /**
    * 設定SessionStorage內指定的值
    * @param key Key值
    * @param value 內容
    */
     setSessionStorageValue(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    },

    /**
     * 取得SessionStorage內指定的值
     * @param key Key值
     */
    getSessionStorageValue(key: string): string | null {
        return sessionStorage.getItem(key);
    },

    /**
     * 移除SessionStorage內指定的值
     * @param key Key值
     */
    removeSessionStorageValue(key: string): void {
        sessionStorage.removeItem(key);
    }
}