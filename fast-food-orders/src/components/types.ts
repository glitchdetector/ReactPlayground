// enum order state
export const OrderState = {
  Pending: "Pending",
  Ready: "Ready",
  Completed: "Completed",
  Error: "Error",
} as const;

export type OrderState = (typeof OrderState)[keyof typeof OrderState];

export interface iOrder {
    id: number;
    kiosk: number,
    orderState: OrderState;
    items: string[];
    createdAt?: Date;
}

export interface iDisplayOrder {
    id: number;
    kiosk: number,
    orderState: OrderState;
}

export interface iDisplayMessage {
    command: string,
    id?: number,
    kiosk?: number,
    orderState?: OrderState,
}