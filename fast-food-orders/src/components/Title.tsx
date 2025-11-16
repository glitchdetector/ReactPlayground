import { useEffect, type ReactNode } from "react";

interface titleProps { title: string }

export const Title = ({ title }: titleProps): ReactNode => {
    useEffect(() => {
        document.title = title;
    }, [title]);
    return null
}
