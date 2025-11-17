import type { ReactNode } from "react";
import type { iOrder } from "../types";
import { OrderEntryControls } from "./OrderEntryControls";
import { motion } from "framer-motion";

const OrderEntryListStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    gap: "1em",
    width: "100%",
    overflowY: "auto",
    flexWrap: "wrap",
}

interface OrderEntryListProps {orders: iOrder[], clicked: (id: number) => void}

export const OrderEntryList = ({orders, clicked} : OrderEntryListProps) : ReactNode => {
    return <div style={OrderEntryListStyle}>
        {orders.map((order: iOrder) => <motion.div layout key={"order_wrapper_" + order.id}>
            <OrderEntryControls key={"order_" + order.id} order={order} clicked={() => {clicked(order.id)}}></OrderEntryControls>
        </motion.div>)}
    </div>
}
