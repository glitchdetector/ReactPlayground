import type { ReactNode } from "react";
import { type iDisplayOrder, OrderState } from "../types";

interface orderEntryProps { order: iDisplayOrder, highlight: Boolean }

export const OrderEntry = ({ order, highlight }: orderEntryProps): ReactNode => {
    return <div style={{
        backgroundColor: order.orderState === OrderState.Pending ? "orange" : "green",
        height: "1.75em",
        minWidth: "3.5em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        fontSize: highlight ? "11.2em" : "3.5em",
        fontWeight: 700,
        borderRadius: "1vh",
        flexGrow: "1",
        margin: "0 10px 10px 0",
        letterSpacing: "0.1em",
    }}>
        <span style={{
            marginTop: "0.3em",
        }}>
            {order.kiosk}
            {(order.id % 100).toString().padStart(2, "0")}
        </span>
    </div>
}