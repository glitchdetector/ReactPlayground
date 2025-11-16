import type { ReactNode } from "react";

export const ButtonListWrapper = ({children} : React.PropsWithChildren) : ReactNode => {
    return <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "0.5em",
        width: "100%",
    }}>
        {children}
    </div>
}