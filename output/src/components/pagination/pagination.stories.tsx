import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Pagination from "./pagination"; // Pagination 경로 확인!
import usePaginationStore from "@/stores/usePaginationStore";

// Zustand 상태를 안전하게 초기화하는 함수
const initializePaginationStore = () => {
  usePaginationStore.setState({ currentPage: 1, totalPages: 20 });
};

export default {
  title: "Components/Pagination",
  component: Pagination,
  decorators: [
    (Story) => {
      initializePaginationStore(); // Zustand 상태 초기화
      return <Story />;
    },
  ],
} as Meta;

export const Default: StoryObj<typeof Pagination> = {};
