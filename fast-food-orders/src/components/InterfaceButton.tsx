import type { ReactNode } from "react";

interface InterfaceButtonProps{action : Function, children?: ReactNode}

export const InterfaceButton = ({action, children} : InterfaceButtonProps): ReactNode => {
    return <button 
    onClick={() => action()}
    style={{
        backgroundColor: "rgb(255, 134, 57)",
        borderRadius: "2px",
        borderWidth: 0,
        boxSizing: "border-box",
        color: "#FFF",
        cursor: "pointer",
        display: "block",
        flexBasis: "240px",
        fontFamily: "Lato, sans-serif",
        fontSize: "16px",
        fontWeight: 700,
        height: "46px",
        lineHeight: "46px",
        overflow: "hidden",
        paddingInline: "14px",
        scrollbarColor: "rgb(204, 204, 204) #000",
        textAlign: "center",
        textDecoration: "none",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",      // replaces text-wrap-mode: nowrap
        width: "fit-content",
    }}>{children}</button>
}