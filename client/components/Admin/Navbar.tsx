import { CircleUser, Menu, Package2, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

export default function Navbar() {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                    href="/admin/dashboard"
                    className="text-foreground transition-colors hover:text-foreground"
                >
                    Dashboard
                </Link>
                <Link
                    href="/admin/users"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Users
                </Link>
                <Link
                    href="/admin/posts"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Posts
                </Link>
                <Link
                    href="/admin/reports"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Reports
                </Link>
                <Link
                    href="/admin/transaction"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Transaction
                </Link>
                <Link
                    href="/admin/subscription"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Subscription
                </Link>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link
                            href="/admin/dashboard"
                            className="hover:text-foreground"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/users"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Users
                        </Link>
                        <Link
                            href="/admin/posts"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Posts
                        </Link>
                        <Link
                            href="/admin/reports"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Reports
                        </Link>
                        <Link
                            href="/admin/"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Analytics
                        </Link>
                        <Link
                            href="/admin/subscription"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Subscription
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    );
}
