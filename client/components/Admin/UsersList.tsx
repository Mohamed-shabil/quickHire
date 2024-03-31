import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Badge } from '../ui/badge'
import Image from 'next/image'

const UsersList = () => {
  return (
    <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Headline</TableHead>
                        <TableHead className="hidden md:table-cell">
                            Verified
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            User Type
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Blocked
                        </TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                <TableRow>
                    <TableCell className="hidden sm:table-cell">
                        <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                        />
                    </TableCell>
                    <TableCell className="font-medium">
                        Laser Lemonade Machine
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">Draft</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        $499.99
                    </TableCell>
                    <TableCell className="hidden md:table-cell">25</TableCell>
                    <TableCell className="hidden md:table-cell">
                        2023-07-12 10:42 AM
                    </TableCell>
                    <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
    </Card>
  )
}

export default UsersList