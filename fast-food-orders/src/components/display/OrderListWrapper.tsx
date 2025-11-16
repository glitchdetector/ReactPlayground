import type { ReactNode } from "react";
import { motion } from "framer-motion";

export const OrderListWrapper = ({children} : React.PropsWithChildren) : ReactNode => {
    return <motion.div layout style={{
        display: "flex",
        flexDirection: "row",
        flexGrow: "1",
    }}>
        {children}
    </motion.div>
}