import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
import { User } from "@/constants/constants";

const getAllUsers = async (token:string,role:string) => {
  const response = await axios.get("http://localhost:3001/api/users/get-all", {
    params:{
        
    },
    headers: {
      Cookie: `jwt=${token}`,
    },
  });

  console.log(response.data);

  return response.data.users as User[];
};

const UsersList = async ({role}:{role:string}) => {
  const token = cookies().get("jwt")?.value;
  if (!token) {
    return redirect("/signup");
  }
  const users = await getAllUsers(token,role);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">All {role}</CardTitle>
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
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Verified</TableHead>
              <TableHead className="hidden md:table-cell">User Type</TableHead>
              <TableHead className="hidden md:table-cell">Blocked</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={user.avatar}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {user.fullName || user.name}
                </TableCell>
                <TableCell>{user.headLine}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline">
                    {user.verified ? "Verified" : "Not Verified"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline" className="capitalize">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.isBlocked ? "True" : "False"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
};

export default UsersList;
