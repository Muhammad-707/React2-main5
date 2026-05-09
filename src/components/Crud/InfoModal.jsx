import React from "react";
import { useStore } from "@/reducer/reducer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  MapPin, 
  ShieldCheck, 
  Phone, 
  Pencil, 
  Trash2, 
  X 
} from "lucide-react";

export default function InfoModal() {
  // Предположим, в сторе есть состояние для этого окна
  const { 
    isInfoOpen, 
    setInfoOpen, 
    selectedUser, 
    setEditModalOpen, 
    deleteUser 
  } = useStore();

  if (!selectedUser) return null;

  const handleEdit = () => {
    setInfoOpen(false); // Закрываем инфо
    setEditModalOpen(true, selectedUser); // Открываем редактирование
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser(selectedUser.id);
      setInfoOpen(false);
    }
  };

  return (
    <Sheet open={isInfoOpen} onOpenChange={setInfoOpen}>
      <SheetContent className="sm:max-w-[400px] p-0 border-l shadow-2xl">
        {/* Кастомный хедер как на фото */}
        <div className="flex items-center justify-between p-4 border-b">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setInfoOpen(false)}
            className="rounded-full"
          >
            <X size={20} />
          </Button>
          <span className="font-semibold text-lg">User info</span>
          <div className="w-9" /> {/* Спейсер для центровки заголовка */}
        </div>

        <div className="p-8 flex flex-col items-center">
          {/* Аватар */}
          <Avatar className="w-40 h-40 border-4 border-white shadow-lg mb-4">
            <AvatarImage src={selectedUser.img} alt={selectedUser.name} className="object-cover" />
            <AvatarFallback className="text-4xl">{selectedUser.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          {/* Имя и почта */}
          <h2 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h2>
          <p className="text-gray-400 text-sm mb-8">{selectedUser.email}</p>

          {/* Список данных */}
          <div className="w-full space-y-6 border-t pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={18} className="text-gray-400" />
                <span className="text-sm font-medium">City</span>
              </div>
              <span className="text-sm text-gray-800 font-semibold">{selectedUser.city}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-600">
                <ShieldCheck size={18} className="text-gray-400" />
                <span className="text-sm font-medium">Status</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                selectedUser.status === 'ACTIVE' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {selectedUser.status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={18} className="text-gray-400" />
                <span className="text-sm font-medium">Phone</span>
              </div>
              <span className="text-sm text-gray-800 font-semibold">{selectedUser.phone}</span>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-4 w-full mt-10">
            <Button 
              onClick={handleEdit}
              className="flex-1 bg-[#2196F3] hover:bg-[#1976D2] text-white py-6 rounded-md shadow-md"
            >
              <Pencil size={18} className="mr-2" /> EDIT
            </Button>
            <Button 
              onClick={handleDelete}
              variant="outline" 
              className="flex-1 border-red-200 text-red-500 hover:bg-red-50 py-6 rounded-md"
            >
              <Trash2 size={18} className="mr-2" /> DELETE
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}