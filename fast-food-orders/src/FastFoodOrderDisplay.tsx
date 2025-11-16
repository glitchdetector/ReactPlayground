import { useEffect, useState } from "react"
import { type iDisplayOrder, OrderState } from "./components/types"
import { OrderListWrapper } from "./components/display/OrderListWrapper"
import { OrderList } from "./components/display/OrderList"
import { VerticalLine } from "./components/display/VerticalLine"
import { WatermarkLogo } from "./components/WatermarkLogo"
import { createChannel } from "./broadcastChannel"

import Logo from "./assets/logo.png";
import { Title } from "./components/Title"

const channel = createChannel<{ command: string }>("order-display");

const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const FastFoodOrderDisplay = (): React.ReactNode => {
    const [orderList, setOrderList] = useState<iDisplayOrder[]>([])

    const addOrder = () => {
        setOrderList(prev => [...prev, { id: prev.length + 1, kiosk: randomInt(14, 26), orderState: OrderState.Pending }]);
    }

    const setNextOrderTo = (state: "Ready" | "Completed") => {
        setOrderList(prev => {
            const fromState = state === "Ready" ? "Pending" : "Ready";
            const toState = state === "Ready" ? "Ready" : "Completed";

            let updated = false;

            return prev.map(order => {
                if (!updated && order.orderState === fromState) {
                    updated = true;
                    // return a NEW object, don't mutate the old one
                    return { ...order, orderState: toState };
                }
                return order;
            });
        });
    };

    const onCreateOrder = () => { addOrder() }
    const onSetOrderAsReady = () => { setNextOrderTo("Ready") }
    const onSetOrderAsCompleted = () => { setNextOrderTo("Completed") }

    const commandPallette: Record<string, Function> = {
        "ADD_ORDER": onCreateOrder,
        "READY_ORDER": onSetOrderAsReady,
        "COMPLETE_ORDER": onSetOrderAsCompleted,
    }

    useEffect(() => {
        const handler = (event: MessageEvent<{ command: string }>) => {
            commandPallette[event.data.command]?.();
        };

        channel.addEventListener("message", handler);
        return () => channel.removeEventListener("message", handler);
    }, []);


    const FastFoodOrderDisplayStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "0.5em", margin: "0 2em 0 2em", height: "100%" };


    return <div style={FastFoodOrderDisplayStyle}>
        <Title title="Order Display"></Title>
        <OrderListWrapper>
            <OrderList orders={orderList} listType={OrderState.Pending} title="I bestilling" reverse={false} />
            <VerticalLine />
            <OrderList orders={orderList} listType={OrderState.Ready} title="Ferdig" reverse={true} />
        </OrderListWrapper>
        <WatermarkLogo url={Logo} />
    </ div>
}