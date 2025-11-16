import type { ReactNode } from "react";

export const DisplayTitle = ({children} : React.PropsWithChildren) : ReactNode => {
    return <div style={{fontSize:"2em",color:"orange"}}>{children}</div>
}