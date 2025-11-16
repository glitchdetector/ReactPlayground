import type { ReactNode } from "react";
interface watermarkLogoProps{url: string}
export const WatermarkLogo = ({url} : watermarkLogoProps) : ReactNode => {
    return <img src={url} alt="" style={{
        position: "fixed",
        bottom: "1em",
        right: "1em",
        width: "5em",
    }}/>
}