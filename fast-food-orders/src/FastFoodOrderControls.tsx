import { ButtonListWrapper } from "./components/display/ButtonListWrapper"
import { DisplayTitle } from "./components/DisplayTitle"
import { createChannel } from "./broadcastChannel";
import { Title } from "./components/Title"
import { InterfaceButton } from "./components/InterfaceButton"
import { OrderState, type iDisplayMessage, type iOrder } from "./components/types";
import { useState } from "react";
import { OrderEntryList } from "./components/controls/OrderEntryList";

const channel = createChannel<{ command: string }>("order-display");

// Sample products to make a random order from
const products = [
  "Burger",
  "Fries",
  "Soda",
  "Nuggets",
  "Ice Cream",
  "Pizza",
  "Wrap",
]

const debugMakeRandomOrder = (): string[] => {
  const numberOfItems = Math.floor(Math.random() * 5) + 1;
  const orderItems: string[] = [];
  for (let i = 0; i < numberOfItems; i++) {
    const product = products[Math.floor(Math.random() * products.length)];
    orderItems.push(product);
  }
  return orderItems;
}

const makeNewOrder = (id: number, kiosk: number): iOrder => {
  return {
    id: id,
    kiosk: kiosk,
    orderState: OrderState.Pending,
    items: debugMakeRandomOrder(),
    createdAt: new Date(),
  }
}

// debugMakeNewOrder uses state setter and is defined inside the component below

export const FastFoodOrderControls = (): React.ReactNode => {

  const sendCommand = (command: iDisplayMessage) => {
    channel.postMessage(command);
  };

  const [orders, setOrders] = useState<iOrder[]>([]);

  const debugMakeNewOrder = (): iOrder => {
    const id = orders.length + 1;
    const kioskNumber = Math.floor(Math.random() * 8) + 13;
    const order: iOrder = makeNewOrder(id, kioskNumber);
    setOrders(prevOrders => [...prevOrders, order]);
    channel.postMessage({ command: "ADD_ORDER", id: order.id, kiosk: order.kiosk });
    return order;
  }

  const onOrderClicked = (id: number) => {
    setOrders(prevOrders => {
      let updatedOrders = [];
      for (const order of prevOrders) {
        if (order.id === id) {
          let newState: OrderState;
          switch (order.orderState) {
            case OrderState.Pending:
              newState = OrderState.Ready;
              break;
            case OrderState.Ready:
              newState = OrderState.Completed;
              break;
            default:
              newState = order.orderState;
          }
          updatedOrders.push({ ...order, orderState: newState });
          sendCommand({ command: "SET_ORDER_AS", id: id, orderState: newState });
        } else {
          updatedOrders.push(order);
        }
      }
      return updatedOrders;
    });
  }

  return <div style={{
    minWidth: "640px",
    minHeight: "380px",

    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: "1em",
    alignItems: "center",
    padding: "15px",

  }}>
    <Title title="Display Controls"></Title>
    {/* <OrderCounter orders={orderList} /> */}
    <ButtonListWrapper>
      <DisplayTitle>Orders</DisplayTitle>
      <div style={{width: "5em"}}></div>
      <InterfaceButton action={() => { debugMakeNewOrder() }} >Create New Order</InterfaceButton>
      <InterfaceButton action={() => { sendCommand({ command: "DELETE_ALL" }) }} >Delete All</InterfaceButton>
    </ButtonListWrapper>
    <OrderEntryList orders={orders.filter(order => order.orderState !== OrderState.Completed)} clicked={(id: number) => { onOrderClicked(id) }} />
  </div>
}