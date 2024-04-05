import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const TransactionList = () => {
    return (
        <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>
                        Recent transactions from your store.
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="#">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="hidden xl:table-column">
                                Type
                            </TableHead>
                            <TableHead className="hidden xl:table-column">
                                Status
                            </TableHead>
                            <TableHead className="hidden xl:table-column">
                                Date
                            </TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Liam Johnson</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    liam@example.com
                                </div>
                            </TableCell>
                            <TableCell className="hidden xl:table-column">
                                Sale
                            </TableCell>
                            <TableCell className="hidden xl:table-column">
                                <Badge className="text-xs" variant="outline">
                                    Approved
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                2023-06-23
                            </TableCell>
                            <TableCell className="text-right">
                                $250.00
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default TransactionList;
