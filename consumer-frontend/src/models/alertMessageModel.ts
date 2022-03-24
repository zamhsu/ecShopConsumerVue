export type AlertEventModel = {
    alertEvent: AlertMessageModel
}

export interface AlertMessageModel {
    id?: string,
    message: string,
    status: "primary" | "success" | "warning" | "danger",
    icon?: string,
    timestamp?: number
}