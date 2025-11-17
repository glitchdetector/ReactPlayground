import { useEffect, useState } from "react"
import { type iDisplayMessage, type iDisplayOrder, OrderState } from "./components/types"
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

    const addOrder = (id: number, kiosk: number, orderState: OrderState) => {
        setOrderList(prev => [...prev, { id: id, kiosk: kiosk, orderState: orderState }]);
    }

    const setOrderAs = (id: number, state: OrderState) => {
        setOrderList(prev => prev.map(order => {
            if (order.id === id) {
                return { ...order, orderState: state };
            }
            return order;
        }));
    }

    const deleteAllOrders = () => {
        setOrderList(_ => []);
    }

    const onCreateOrder = (message: iDisplayMessage) => { addOrder(message.id!, message.kiosk!, OrderState.Pending) }
    const onSetOrderAs = (message: iDisplayMessage) => { setOrderAs(message.id!, message.orderState!) }
    const onDeleteAllOrders = () => { deleteAllOrders() }

    const commandPallette: Record<string, Function> = {
        "ADD_ORDER": onCreateOrder,
        "SET_ORDER_AS": onSetOrderAs,
        "DELETE_ALL": onDeleteAllOrders,
    }

    useEffect(() => {
        const handler = (event: MessageEvent<iDisplayMessage>) => {
            commandPallette[event.data.command]?.(event.data);
        };

        channel.addEventListener("message", handler);
        return () => channel.removeEventListener("message", handler);
    }, []);


    const FastFoodOrderDisplayStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column", 
        gap: "0.5em", 
        margin: "0 2em 0 2em", 
        height: "100%",
        overflow: "hidden",
    };


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