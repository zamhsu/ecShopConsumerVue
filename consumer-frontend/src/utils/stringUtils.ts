/**
 * 取得自製GUID
 * @returns 
 */
export function getGuid(): string {
    let d = Date.now();
    
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

/**
 * 取得客戶端時區（格式XX:00:00)）
 * @returns 
 */
export function getClientTimeZone(): string {
    const clientDate = new Date(Date.now());
    // [+8區為-480分鐘], [-3區為+180分鐘]
    const timeZone = -(clientDate.getTimezoneOffset() / 60);

    if (timeZone >= 10 || timeZone <= -10) {
        return `${timeZone}:00:00`;
    }
    else {
        return `0${timeZone}:00:00`;
    }
}

export const stringUtils = {
    getGuid, getClientTimeZone
}