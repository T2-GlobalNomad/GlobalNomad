import { create } from "zustand";
import { Pagination } from "@/lib/types";

const usePaginationStore = create<Pagination>((set) => ({
  currentPage: 1, //현재 페이지 기본값
  totalPages: 1, //전체 페이지 수 기본값
  pageSize: 6, //한 페이지당 아이템 개수 기본값
  setPageSize: (item: number) => set({ pageSize: item }), // 한페이지당 불러올 아이템 갯수 변경
  setPage: (page: number) => set({ currentPage: page }), //현재 페이지 변경
  setTotalPages: (total: number) => set({ totalPages: total }), // 전체 페이지수 업데이트
}));

export default usePaginationStore;
