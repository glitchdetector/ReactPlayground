import type { PropsWithChildren } from "react"
import type { iOrder, OrderState } from "../types"
import { formatTimeSince, useTimeSince } from "../timeDisplay";
interface OrderEntryControlsProps {order: iOrder, clicked: () => void}

const stateColors: Record<OrderState, string> = {
    Pending: "lightyellow",
    Ready: "lightgreen",
    Completed: "white",
    Error: "lightcoral",
};

const OrderEntryControlsStyle = (order: iOrder): React.CSSProperties => ({
    backgroundColor: stateColors[order.orderState],
    border: "1px solid gray",
    borderRadius: "8px",
    cursor: "pointer",
    padding: "0.5em",
});

export const OrderEntryControls = ({order, clicked, children} : PropsWithChildren<OrderEntryControlsProps>) : React.ReactNode => {
    const seconds = useTimeSince(order.createdAt!);
    return <div style={OrderEntryControlsStyle(order)} onClick={() => {clicked()}}>
        <div style={{fontWeight: "bold", fontSize: "1.2em"}}>{order.id}</div>
        <div>Kiosk: {order.kiosk}</div>
        <div>Status: {order.orderState}</div>
        <div>Age: {formatTimeSince(seconds)}</div>
        {children}
    </div>
}
