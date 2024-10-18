import BlankLayout from "@/components/layouts/BlankLayout"

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
