import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Plus, Sun, Search } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import UserList from './UserList';
import AddModal from './AddModal';
import EditModal from './EditModal';
import InfoModal from './InfoModal';
import { useStore } from "@/reducer/reducer";

export default function Crud() {
    // 1. Состояния для фильтров
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [city, setCity] = useState("all");

    // 2. Состояние для темы (по умолчанию берем из системы или localStorage)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // 3. Эффект для применения темы
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const setAddModalOpen = useStore((state) => state.setAddModalOpen);

    return (
        // Добавляем transition для плавного переключения цветов
        <div className='min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300'>
            <div className='max-w-[1350px] mx-auto pt-5 px-4'>
                {/* HEADER */}
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold text-4xl text-gray-800 dark:text-white'>User List</h1>
                    <div className='flex items-center gap-6'>
                        <Button
                            onClick={() => setAddModalOpen(true)}
                            className="bg-[#2196F3] hover:bg-[#1976D2] text-white px-6 h-11 text-lg font-medium shadow-md transition-all"
                        >
                            <Plus className='mr-2 size-5' /> New
                        </Button>

                        {/* Переключатель Темы */}
                        <div className='flex items-center border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden bg-white dark:bg-slate-900'>
                            <Button 
                                onClick={() => setTheme('light')}
                                variant="ghost" 
                                className={`px-4 h-11 text-sm border-r rounded-none transition-all ${
                                    theme === 'light' 
                                    ? 'bg-gray-100 dark:bg-slate-800 text-black dark:text-white' 
                                    : 'text-gray-400'
                                }`}
                            >
                                <Sun className='mr-2 size-4' /> Light
                            </Button>
                            <Button 
                                onClick={() => setTheme('dark')}
                                variant="ghost" 
                                className={`px-4 h-11 text-sm rounded-none transition-all ${
                                    theme === 'dark' 
                                    ? 'bg-gray-100 dark:bg-slate-800 text-black dark:text-white' 
                                    : 'text-gray-400'
                                }`}
                            >
                                Dark <Moon className='ml-2 size-4' />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* FILTERS AREA */}
                <div className="flex items-end justify-between gap-4 pt-10">
                    <div className="flex items-center gap-4">
                        {/* Status Filter */}
                        <div className="relative">
                            <label className="absolute -top-2 left-2 bg-white dark:bg-slate-950 px-1 text-[11px] font-medium text-gray-400 z-10">
                                Status
                            </label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="w-[200px] py-6 border-gray-300 dark:border-gray-700 dark:bg-slate-900 dark:text-white">
                                    <SelectValue placeholder="All status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* City Filter */}
                        <div className="relative">
                            <label className="absolute -top-2 left-2 bg-white dark:bg-slate-950 px-1 text-[11px] font-medium text-gray-400 z-10">
                                City
                            </label>
                            <Select value={city} onValueChange={setCity}>
                                <SelectTrigger className="w-[200px] py-6 border-gray-300 dark:border-gray-700 dark:bg-slate-900 dark:text-white">
                                    <SelectValue placeholder="All cities" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All cities</SelectItem>
                                    <SelectItem value="Dushanbe">Dushanbe</SelectItem>
                                    <SelectItem value="Khujand">Khujand</SelectItem>
                                    <SelectItem value="Kulob">Kulob</SelectItem>
                                    <SelectItem value="Bokhtar">Bokhtar</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Search Input */}
                    <div className="relative flex-1 max-w-[400px]">
                        <label className="absolute -top-2 left-3 bg-white dark:bg-slate-950 px-1 text-[11px] font-medium text-gray-400 z-10">
                            Search
                        </label>
                        <div className="relative flex items-center">
                            <Input
                                type="text"
                                placeholder="Name, email, etc..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pr-10 py-6 border-gray-300 dark:border-gray-700 dark:bg-slate-900 dark:text-white placeholder:text-gray-300"
                            />
                            <Search className="absolute right-3 text-gray-400" size={20} />
                        </div>
                    </div>
                </div>

                {/* TABLE AREA */}
                <div className='py-8'>
                    <UserList 
                        search={search} 
                        status={status} 
                        city={city} 
                    />
                </div>
            </div>

            {/* MODALS */}
            <AddModal />
            <EditModal />
            <InfoModal />
        </div>
    );
}