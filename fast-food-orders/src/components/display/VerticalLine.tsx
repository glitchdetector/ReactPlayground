import type { ReactNode } from "react";

export const VerticalLine = () : ReactNode => {
    return <div style={{
        display: "flex",
        flexBasis: "4%",
        justifyContent: "center",
        fontSize: "2em",
        color: "black",
    }}>
        <div style={{
        minWidth: "0.15em",
        marginTop: "0.1em",
        marginBottom: "0.1em",
        backgroundColor: "gray"
    }}></div>
    </div>
}