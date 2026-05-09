import { create } from "zustand";

export const useStore = create((set) => ({
  state: "", // Сюда можно записывать текст из инпутов
  // Твои локальные данные теперь в глобальном сторе
  users: [
    { id: 1, name: "Jacob Jones", email: "jackson.graham@example.com", city: "Dushanbe", status: "INACTIVE", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Jenny Wilson", email: "jessica.hanson@example.com", city: "Kulob", status: "INACTIVE", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Guy Hawkins", email: "bill.sanders@example.com", city: "Dushanbe", status: "INACTIVE", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Cody Fisher", email: "michael.mitc@example.com", city: "Bokhtar", status: "ACTIVE", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Esther Howard", email: "felicia.reid@example.com", city: "Dushanbe", status: "ACTIVE", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=5" },
    { id: 6, name: "Kristin Watson", email: "kenzi.lawson@example.com", city: "Khujand", status: "ACTIVE", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=6" },
    { id: 7, name: "Dianne Russell", email: "deanna.curtis@example.com", city: "Dushanbe", status: "INACTIVE", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=7" },
    { id: 8, name: "Ronald Richards", email: "tim.jennings@example.com", city: "Hisor", status: "ACTIVE", phone: "88888 0090", img: "https://i.pravatar.cc/150?u=8" },
  ],
  isAddModalOpen: false,
  isEditModalOpen: false, // Состояние для модалки редактирования
  editingUser: null,      // Здесь будем хранить юзера, которого правим

  setAddModalOpen: (open) => set({ isAddModalOpen: open }),

  // Функции для редактирования
  setEditModalOpen: (open, user = null) => set({
    isEditModalOpen: open,
    editingUser: user
  }),

  addUser: (user) => set((state) => ({ users: [...state.users, user] })),

  deleteUser: (id) => set((state) => ({
    users: state.users.filter((user) => user.id !== id)
  })),

  // Функция обновления данных
  updateUser: (updatedUser) => set((state) => ({
    users: state.users.map((u) => u.id === updatedUser.id ? updatedUser : u)
  })),

  // Примерная структура в вашем сторе
  isInfoOpen: false,
  selectedUser: null,
  setInfoOpen: (isOpen, user = null) => set({
    isInfoOpen: isOpen,
    selectedUser: user
  }),

}));