import Layout from "@/components/Layout"
import { cn } from "@/utils"
import BlankLayout from "./Layouts/BlankLayout"

type Props = {
    title: string
    heading?: string
    className?: string
    children: React.ReactNode
}
export default ({ title, heading, className, children }:Props) => {
    return (<BlankLayout>
        {children}
    </BlankLayout>)
}
