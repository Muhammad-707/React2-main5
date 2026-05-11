import { create } from "zustand";

export const useStore = create((set) => ({
  state: "", 
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
  isEditModalOpen: false, 
  editingUser: null,     

  setAddModalOpen: (open) => set({ isAddModalOpen: open }),

  setEditModalOpen: (open, user = null) => set({
    isEditModalOpen: open,
    editingUser: user
  }),

  addUser: (user) => set((state) => ({ users: [...state.users, user] })),

  deleteUser: (id) => set((state) => ({
    users: state.users.filter((user) => user.id !== id)
  })),

  updateUser: (updatedUser) => set((state) => ({
    users: state.users.map((e) => e.id === updatedUser.id ? updatedUser : e)
  })),

  isInfoOpen: false,
  selectedUser: null,
  setInfoOpen: (isOpen, user = null) => set({
    isInfoOpen: isOpen,
    selectedUser: user
  }),

}));