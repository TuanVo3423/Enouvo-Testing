import { IMatrix } from "@/interface/common";
import { create } from "zustand";

export interface IMatrixStore {
  matrixes: IMatrix[];
  addMatrix: (matrix: IMatrix) => void;
  updateMatrix: (matrix: IMatrix) => void;
  deleteMatrix: (matrix: IMatrix) => void;
}
export const useMatrixStore = create<IMatrixStore>((set) => ({
  matrixes: [],
  addMatrix: (matrix) =>
    set((state) => ({ matrixes: [...state.matrixes, matrix] })),
  updateMatrix: (matrix) =>
    set((state) => ({
      matrixes: state.matrixes.map((m) => (m.id === matrix.id ? matrix : m)),
    })),
  deleteMatrix: (matrix) =>
    set((state) => ({
      matrixes: state.matrixes.filter((m) => m.id !== matrix.id),
    })),
}));
