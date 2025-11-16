import { AddOrderButton } from "./components/controls/AddOrderButton"
import { ButtonListWrapper } from "./components/display/ButtonListWrapper"
import { CompleteOrderButton } from "./components/controls/CompleteOrderButton"
import { DisplayTitle } from "./components/DisplayTitle"
import { ReadyOrderButton } from "./components/controls/ReadyOrderButton"
import { createChannel } from "./broadcastChannel";
import { Title } from "./components/Title"

const channel = createChannel<{ command: string }>("order-display");

export const FastFoodOrderControls = (): React.ReactNode => {

  const sendCommand = (command: string) => {
    channel.postMessage({ command });
  };

    return <div style={{
        minWidth: "640px",
        minHeight: "380px",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1em",
        alignItems: "center",
        padding: "15px",
        
    }}>
        <Title title="Display Controls"></Title>
        <DisplayTitle>Display Controls</DisplayTitle>
        {/* <OrderCounter orders={orderList} /> */}
        <ButtonListWrapper>
            <AddOrderButton addOrder={() => {sendCommand("ADD_ORDER")}} />
            <ReadyOrderButton readyOrder={() => {sendCommand("READY_ORDER")}} />
            <CompleteOrderButton completeOrder={() => {sendCommand("COMPLETE_ORDER")}} />
        </ButtonListWrapper>
    </div>
}