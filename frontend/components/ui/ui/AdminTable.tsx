
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ghost, ListFilter, MoreHorizontal, PlusCircle } from 'lucide-react'
import { Button } from '../button'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from '../badge'
import axios from 'axios'
import { BACKEND_URL } from '@/config'
import { cookies } from 'next/headers'
import Edit from './Edit'
import DeleteBtn from './DeleteBtn'

interface admin {
    id?: string
    name: string
    role: string
    email: string
    createdAt: any
}

const AdminTable = async () => {
    const response = await axios.get(`${BACKEND_URL}/admin/miniadmin`, {
        withCredentials: true,
    })
    const data = await response.data.data
    console.log(cookies().get("token"))

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <div className="ml-auto flex items-center gap-2">
                        {/* filter function */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 gap-1">
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Active
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Archived
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Edit type='Add' btnVariant={'default' || ""} />
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Users details</CardTitle>
                            <CardDescription>
                                Manage users and there role.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>email</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Created at
                                        </TableHead>
                                        <TableHead>
                                            <span className="sr-only">Actions</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.map((item: admin, idx: number) => (

                                        <TableRow key={idx}>

                                            <TableCell className="font-medium">
                                                {item.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{item.role}</Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {item.email}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {item.createdAt}
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
                                                        <DropdownMenuLabel className='text-center'>Actions</DropdownMenuLabel>
                                                        <Edit type='Edit' item={item} />
                                                        <DropdownMenuItem>
                                                            <DeleteBtn id={item?.id || ""} />
                                                        </DropdownMenuItem>
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
                                <strong>{data.length}</strong>{" "}
                                Users
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}

export default AdminTable
