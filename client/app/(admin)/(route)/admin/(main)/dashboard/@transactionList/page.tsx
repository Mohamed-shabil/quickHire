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
import { ArrowUpRight, TramFront } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Transaction } from "@/types/types";
import { getTransactions } from "@/services/api/payments.service";
import ErrorMessage from "@/components/ErrorMessage";

const getTransactionsList = async (token: string): Promise<Transaction[]> => {
    try {
        const response = await getTransactions(token);
        console.log(response);
        return response.data.transactions;
    } catch (error: any) {
        throw new Error(
            error.response.data.errors[0].message || "Something went wrong"
        );
    }
};

const TransactionList = async () => {
    const token = cookies().get("jwt")?.value;
    if (!token) {
        return redirect("/admin/login");
    }
    const transactions = await getTransactionsList(token);
    if (!transactions) {
        console.log(transactions);
    }
    return (
        <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>
                        Recent transactions from your app.
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/admin/transaction">
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
                    {transactions.length ? (
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction._id}>
                                    <TableCell>
                                        <div className="font-medium">
                                            {transaction.userId?.fullName ||
                                                transaction.userId?.name}
                                        </div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            {transaction.userId?.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden xl:table-column"></TableCell>
                                    <TableCell className="hidden xl:table-column">
                                        <Badge
                                            className="text-xs"
                                            variant="outline"
                                        >
                                            Approved
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell lg:hidden xl:table-column">
                                        2023-06-23
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge
                                            className="text-xs"
                                            variant="default"
                                        >
                                            {transaction.subscription.planName}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <ErrorMessage message="No Transaction records" />
                    )}
                </Table>
            </CardContent>
        </Card>
    );
};

export default TransactionList;
