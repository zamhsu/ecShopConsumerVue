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