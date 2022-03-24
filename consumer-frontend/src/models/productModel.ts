import { PaginationModel } from "./PaginationModel";

export interface ProductDisplayModel {
    guid: string,
    title: string,
    categoryId: number,
    categoryString: string,
    unitId: number,
    unitString: string,
    quantity: number,
    originPrice: number,
    price: number,
    description: string,
    startDisplay: Date | string,
    endDisplay: Date | string,
    imageUrl: string,
    memo: string,
    statusId: number,
    statusString: string
}

export interface ProductPagedDisplayModel {
    products: ProductDisplayModel[],
    pagination: PaginationModel
}