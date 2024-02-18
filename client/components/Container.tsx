import { cn } from "@/lib/utils";

export function Container({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("container flex flex-col md:flex-row", className)}>
            {children}
        </div>
    );
}