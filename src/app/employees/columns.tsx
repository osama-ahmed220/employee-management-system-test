"use client"

import { DataTableColumnHeader, Navigate, SupervisorRowItem } from "@/components";
import { EmployeeAvatar } from "@/components/employee-avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import EmployeeI from "@/interfaces/EmployeeI";
import { designationData } from "@/lib";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<EmployeeI>[] = [
    {
        accessorKey: "photo",
        header: "",
        cell: ({ row }) => {
            return <EmployeeAvatar photoDisplayUrl={row.getValue('photo')} firstName={row.original.firstName} lastName={row.original.lastName} className="w-12 h-12" />
        }
    },
    {
        accessorKey: "firstName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            return <div className="">{row.original.firstName} {row.original.lastName}</div>
        }
    },
    {
        accessorKey: "designation",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Designation" />
        ),
        cell: ({ row }) => {
            const rowDesignation = row.getValue("designation");
            const designationLabel = designationData.find((d) => d.value === rowDesignation);
            return <div className="">{designationLabel ? designationLabel.label : 'N/A'}</div>
        }
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        cell: ({ row }) => <div className="">{row.getValue("phoneNumber")}</div>,
    },
    {
        accessorKey: "supervisor",
        header: "Supervisor",
        cell: ({ row }) => {
            return <div className="">
                <SupervisorRowItem id={row.original.id} />
            </div>;
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Joining Date" />
        ),
        cell: ({ row }) => {
            const createdAt = row.getValue<string>("createdAt");
            const joinedDate = (new Date(createdAt)).toDateString();
            return <div className="">{joinedDate}</div>
        },
    },
    {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
            const employeeId = row.original.id;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 !ring-0" color="muted10">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Navigate href={`/employees/edit/${employeeId}`} withloading>
                                Edit
                            </Navigate>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Navigate href={`/employees/delete/${employeeId}`} withloading>
                                Delete
                            </Navigate>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];