import { User } from "@/types/user";

import { create } from "zustand";

export interface AuthState {
  user: User | null;
}

export interface AuthActions {
  setUser: (user: User) => void;
  clearUser: () => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));
