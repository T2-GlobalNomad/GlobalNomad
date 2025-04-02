"use client";
import Input from "../customInputs/customInput";
import SelectInput from "../customInputs/customSelectInput";
import styles from "./Title.module.css";
import { useActivityStore } from "@/stores/useActivityStore";

export default function Title() {
  const { activity, setActivity } = useActivityStore(); // Zustand 상태 가져오기

  return (
    <div className={styles.container}>
      {/* 제목 입력 */}
      <Input
        name="title"
        className={styles.inputTitle}
        placeholder="제목을 입력하세요"
        id="title"
        type="text"
        value={activity.title} // Zustand 상태 반영
        onChange={(e) => setActivity({ title: e.target.value })} // 상태 업데이트
      />

      {/* 카테고리 선택 */}
      <div className={styles.category}>
        <SelectInput
          value={activity.category} // Zustand 상태 반영
          onChange={(selectedValue) => setActivity({ category: selectedValue })} // 상태 업데이트
        />
      </div>

      {/* 내용 입력 */}
      <textarea
        className={styles.textarea}
        name="description"
        placeholder="내용을 입력하세요"
        value={activity.description} // Zustand 상태 반영
        onChange={(e) => setActivity({ description: e.target.value })} // 상태 업데이트
      />
    </div>
  );
}
