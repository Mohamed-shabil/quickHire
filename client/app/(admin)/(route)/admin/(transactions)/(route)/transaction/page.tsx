import React from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getTransactions } from "@/services/api/payments.service";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Transaction } from "@/types/types";
import ErrorMessage from "@/components/ErrorMessage";
import moment from "moment";

const getTransactionsList = async (token: string): Promise<Transaction[]> => {
    const response = await getTransactions(token);
    return response.data.transactions;
};

const Transactions = async () => {
    const token = cookies().get("jwt")?.value;
    if (!token) {
        toast({
            title: "Please Login to continue",
        });
        return redirect("/admin/login");
    }
    const transactions = await getTransactionsList(token);
    return (
        <section className="container">
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>
                        Manage your products and view their sales performance.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>email</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Price
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Paid At
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.length ? (
                                transactions.map((transaction) => (
                                    <TableRow key={transaction._id}>
                                        <TableCell className="hidden sm:table-cell">
                                            <Image
                                                alt={transaction.userId.name}
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src={
                                                    transaction.userId.avatar ||
                                                    "/user.png"
                                                }
                                                width="64"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {transaction.userId.fullName}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {transaction.userId.email}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {
                                                    transaction.subscription
                                                        .planName
                                                }
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            ₹ {transaction.subscription.price}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {moment(
                                                transaction.createdAt
                                            ).format("LL")}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <ErrorMessage
                                    message={"No transaction record"}
                                />
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
                {/* <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                        products
                    </div>
                </CardFooter> */}
            </Card>
        </section>
    );
};

export default Transactions;
