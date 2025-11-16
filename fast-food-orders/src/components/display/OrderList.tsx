import type { ReactNode } from "react";
import { type iDisplayOrder, OrderState } from "../types";
import { OrderEntry } from "./OrderEntry";
import { motion, AnimatePresence } from "framer-motion";

interface OrderListProps { orders: iDisplayOrder[], listType: OrderState, title: string, reverse?: boolean }

export const OrderList = ({ orders, listType, title, reverse = false }: OrderListProps): ReactNode => {
    let shownOrders = [...orders];
    if (reverse)
        shownOrders = shownOrders.reverse();
    return <motion.div layout style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        flexBasis: "48%",
        justifyContent: "left",
        alignContent: "flex-start",
        height: "100%",
    }}>
        <div style={{
            display: "flex",
            flexBasis: "100%",
            justifyContent: "center",
            fontSize: "4em",
            marginTop: "0.5em",
            marginBottom: "0.5em",
            color: "black",
        }}><span>{title}</span></div>

        <AnimatePresence initial={false}>
            {
                shownOrders
                    .filter((order) => order.orderState == listType)
                    .map((order, index) =>
                        <motion.div 
                            key={order.id}
                            layout
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1
                            }}
                            exit={{ opacity: 0, y: -15, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        style={{
                            flexBasis: (listType === "Ready" && index == 0) ? "100%" : "25%",
                            display: "flex",
                        }}>
                            <OrderEntry
                                key={"orderentryindex" + listType + index}
                                order={order}
                                highlight={(listType === "Ready" && index == 0)}
                            />
                        </motion.div>
                    )
            }
        </AnimatePresence>
    </motion.div>
}