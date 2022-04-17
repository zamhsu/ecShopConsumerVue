/**
 * 貨幣格式
 * @param num 數字
 * @returns 
 */
export function currency(num: number): string {
    return `$${num.toFixed(0).replace(/./g, (c, i, a) => {
        const currency = (i && c !== "." && ((a.length - i) % 3 === 0) ? `,${c}`.replace(/\s/g, '') : c);
        return currency;
    })}`;
}

/**
 * 格式化日期(yyyy/MM/dd hh:mm:ss)
 * @param date 
 * @returns 
 */
export function fullDateTime(date: Date | string): string {
    const dateFormat = new Date(date);
    let month = "" + (dateFormat.getMonth() + 1); // 轉為字串，JS月份從0開始到11，正常月份加1才能顯示正常月份
    let day = "" + dateFormat.getDate(); // 轉為字串
    const year = dateFormat.getFullYear();
    let hours = "" + dateFormat.getHours();
    let minutes = "" + dateFormat.getMinutes();
    let seconds = "" + dateFormat.getSeconds();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    if (hours.length < 2)
        hours = '0' + hours;
    if (minutes.length < 2)
        minutes = '0' + minutes;
    if (seconds.length < 2)
        seconds = '0' + seconds;

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}