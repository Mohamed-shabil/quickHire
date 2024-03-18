import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Table } from 'lucide-react'
import React from 'react'

const Applicants = () => {
  return (
    <section>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Headline</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Experience</TableHead>
                <TableHead className="text-right">Resume</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            </TableBody>
        </Table>
    </section>
  )
}

export default Applicants