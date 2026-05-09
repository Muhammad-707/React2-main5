import React, { useState, useEffect, useRef } from "react";
import { useStore } from "@/reducer/reducer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";

export default function EditModal() {
  const { isEditModalOpen, setEditModalOpen, editingUser, updateUser } = useStore();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "",
    city: "",
    phone: "",
    img: "",
  });

  // Синхронизация локального состояния с выбранным юзером при открытии
  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name || "",
        email: editingUser.email || "",
        status: editingUser.status ? editingUser.status.toLowerCase() : "",
        city: editingUser.city || "",
        phone: editingUser.phone || "",
        img: editingUser.img || "",
      });
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Теперь Enter сохраняет форму
    
    updateUser({
      ...editingUser, // Важно! Сохраняем ID и другие поля оригинального объекта
      ...formData,    // Перезаписываем измененные поля
      status: formData.status.toUpperCase(), // Возвращаем в верхний регистр для таблицы
    });
    
    setEditModalOpen(false, null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={(val) => setEditModalOpen(val, null)}>
      <DialogContent className="sm:max-w-[450px] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">Edit User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          {/* Поле выбора изображения */}
          <div 
            onClick={() => fileInputRef.current.click()} 
            className="relative border rounded-md p-3 flex justify-between items-center text-gray-400 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="absolute -top-2 left-3 bg-white px-1 text-[11px]">Image</span>
            <span className="text-sm truncate max-w-[200px]">
              {formData.img ? "Image selected" : "Change photo..."}
            </span>
            <Download size={18} />
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>

          <div className="relative">
            <Input 
                placeholder="Full Name" 
                className="py-6" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
            />
          </div>

          <div className="relative">
            <Input 
                type="email"
                placeholder="E-mail" 
                className="py-6" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
            />
          </div>

          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500 z-10">State</label>
            <Select 
                value={formData.status} 
                onValueChange={(val) => setFormData({...formData, status: val})}
            >
              <SelectTrigger className="py-6">
                <SelectValue placeholder="Choose state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500 z-10">City</label>
            <Select 
                value={formData.city} 
                onValueChange={(val) => setFormData({...formData, city: val})}
            >
              <SelectTrigger className="py-6">
                <SelectValue placeholder="All cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dushanbe">Dushanbe</SelectItem>
                <SelectItem value="Khujand">Khujand</SelectItem>
                <SelectItem value="Kulob">Kulob</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Input 
                placeholder="Phone" 
                className="py-6" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
            />
          </div>

          <div className="flex gap-4 mt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-[#2196F3] hover:bg-[#1976D2] text-white py-6 uppercase font-bold tracking-wider"
            >
              Save Changes
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 border-[#2196F3] text-[#2196F3] py-6 uppercase font-bold tracking-wider"
              onClick={() => setEditModalOpen(false, null)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}