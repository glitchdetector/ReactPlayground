import type { ReactNode } from "react";
import type { iOrder } from "../types";
interface OrderCounterProps{orders: iOrder[]}

export const OrderCounter = ({orders} : OrderCounterProps) : ReactNode => {
    return <>
    <div style={{fontSize:"1em"}}>There are currently {orders.filter(order => order.orderState === "Pending").length} orders pending</div>
    <div style={{fontSize:"1em"}}>There are currently {orders.filter(order => order.orderState === "Ready").length} orders ready</div>
    <div style={{fontSize:"1em"}}>There are currently {orders.filter(order => order.orderState === "Completed").length} orders completed</div>
    <div style={{fontSize:"1em"}}>A total of {orders.length} orders today</div>
    </>
}