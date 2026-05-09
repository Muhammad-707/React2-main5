import React, { useState, useRef } from "react";
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

export default function AddModal() {
  const { isAddModalOpen, setAddModalOpen, addUser } = useStore();
  const fileInputRef = useRef(null); // Реф для скрытого инпута
  
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    status: "",
    city: "",
    phone: "",
    img: null,
  });

  const [previewName, setPreviewName] = useState(".png / .jpg / .jpeg");

  // Функция обработки файла
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Теперь Enter будет работать
    
    const newUser = {
      id: Date.now(),
      name: `${formData.name} ${formData.surname}`,
      email: formData.email,
      city: formData.city,
      status: formData.status.toUpperCase() || "INACTIVE",
      phone: formData.phone,
      img: formData.img || "https://i.pravatar.cc/150?u=" + Date.now(),
    };

    addUser(newUser);
    setAddModalOpen(false);
    setFormData({ name: "", surname: "", email: "", status: "", city: "", phone: "", img: null });
    setPreviewName(".png / .jpg / .jpeg");
  };

  return (
    <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
      <DialogContent className="sm:max-w-[450px] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">Add new</DialogTitle>
        </DialogHeader>

        {/* Оборачиваем в форму для работы Enter */}
        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          
          {/* Рабочее поле Image */}
          <div 
            onClick={() => fileInputRef.current.click()} 
            className="relative border rounded-md p-3 flex justify-between items-center text-gray-400 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="absolute -top-2 left-3 bg-white px-1 text-[11px]">Image</span>
            <span className="text-sm truncate max-w-[250px]">{previewName}</span>
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
                placeholder="Name" 
                className="py-6" 
                value={formData.name}
                required
                onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="relative">
            <Input 
                placeholder="Surname" 
                className="py-6" 
                value={formData.surname}
                required
                onChange={(e) => setFormData({...formData, surname: e.target.value})}
            />
          </div>

          <div className="relative">
            <Input 
                type="email"
                placeholder="E-mail" 
                className="py-6" 
                value={formData.email}
                required
                onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500 z-10">State</label>
            <Select onValueChange={(val) => setFormData({...formData, status: val})}>
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
            <Select onValueChange={(val) => setFormData({...formData, city: val})}>
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
                required
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="flex gap-4 mt-4">
            <Button 
              type="submit" // Кнопка теперь отправляет форму
              className="flex-1 bg-[#2196F3] hover:bg-[#1976D2] text-white py-6 uppercase font-bold tracking-wider"
            >
              Save
            </Button>
            <Button 
              type="button" // Чтобы не срабатывал сабмит при отмене
              variant="outline" 
              className="flex-1 border-[#2196F3] text-[#2196F3] py-6 uppercase font-bold tracking-wider"
              onClick={() => setAddModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}