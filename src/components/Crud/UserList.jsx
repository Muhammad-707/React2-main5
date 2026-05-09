import React from "react";
import { useStore } from "@/reducer/reducer";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, User, MapPin, Activity, Phone, Trash2, Pencil, Info } from "lucide-react";

const UserList = ({ search, status, city }) => {
    const users = useStore((state) => state.users);
    const deleteUser = useStore((state) => state.deleteUser);
    const setEditModalOpen = useStore((state) => state.setEditModalOpen);
    const { setInfoOpen } = useStore();

    const filteredUsers = users.filter((user) => {
        const matchesSearch = 
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = status === "all" || user.status.toLowerCase() === status.toLowerCase();
        const matchesCity = city === "all" || user.city === city;
        return matchesSearch && matchesStatus && matchesCity;
    });

    return (
        <div className="w-full bg-white dark:bg-slate-900 rounded-md border dark:border-gray-800 shadow-sm transition-colors duration-300">
            <Table>
                <TableHeader className="bg-gray-50/50 dark:bg-slate-800/50">
                    <TableRow className="dark:border-gray-800">
                        <TableHead className="w-[350px] dark:text-gray-400">
                            <div className="flex items-center gap-2"><User size={16} /> Name</div>
                        </TableHead>
                        <TableHead className="dark:text-gray-400">
                            <div className="flex items-center gap-2"><MapPin size={16} /> Город</div>
                        </TableHead>
                        <TableHead className="dark:text-gray-400">
                            <div className="flex items-center gap-2"><Activity size={16} /> Status</div>
                        </TableHead>
                        <TableHead className="dark:text-gray-400">
                            <div className="flex items-center gap-2"><Phone size={16} /> Phone</div>
                        </TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <TableRow 
                                key={user.id} 
                                className="hover:bg-gray-50 dark:hover:bg-slate-800/50 border-b dark:border-gray-800 last:border-0 h-[75px] transition-colors"
                            >
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border dark:border-gray-700">
                                            <AvatarImage src={user.img} alt={user.name} />
                                            <AvatarFallback className="dark:bg-slate-700 dark:text-white">
                                                {user.name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-900 dark:text-white text-sm">
                                                {user.name}
                                            </span>
                                            <span className="text-gray-500 dark:text-gray-400 text-xs">
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                                    {user.city}
                                </TableCell>
                                <TableCell>
                                    <Badge className={`rounded-sm px-2.5 py-0.5 text-[10px] font-bold border-none ${
                                        user.status === "ACTIVE" 
                                            ? "bg-[#4CAF50] text-white" 
                                            : "bg-[#78909C] dark:bg-slate-700 text-white"
                                    }`}>
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                                    {user.phone}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="focus:outline-none p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                                            <MoreHorizontal className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-40 dark:bg-slate-900 dark:border-gray-800">
                                            <DropdownMenuItem
                                                className="flex items-center gap-2 cursor-pointer dark:text-gray-300 dark:focus:bg-slate-800"
                                                onClick={() => setTimeout(() => setInfoOpen(true, user), 100)}
                                            >
                                                <Info size={14} className="text-gray-600 dark:text-gray-400" /> Info
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() => setEditModalOpen(true, user)}
                                                className="flex items-center gap-2 cursor-pointer dark:text-gray-300 dark:focus:bg-slate-800"
                                            >
                                                <Pencil size={14} className="text-blue-600 dark:text-blue-400" /> Edit
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() => {
                                                    if (confirm(`Удалить пользователя ${user.name}?`)) {
                                                        deleteUser(user.id);
                                                    }
                                                }}
                                                className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600 dark:focus:bg-red-900/20"
                                            >
                                                <Trash2 size={14} /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center text-gray-500 dark:text-gray-400">
                                Пользователи не найдены.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default UserList;