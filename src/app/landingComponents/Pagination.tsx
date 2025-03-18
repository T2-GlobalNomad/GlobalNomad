import styles from '@/components/pagination/pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  setPage,
}: PaginationProps) {
  //페이지 그룹화
  const pageGroup = Math.ceil(currentPage / 5);
  const startPage = (pageGroup - 1) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  //페이지 배열 생성
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  //이전페이지로이동
  const handlePrevGroup = () => {
    if (startPage > 1) setPage(startPage - 5);
  };

  //다음 페이지로 이동
  const handleNextGroup = () => {
    if (endPage < totalPages) setPage(startPage + 5);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handlePrevGroup}
        disabled={startPage === 1}
        className={styles.prevGroup}
      />
      {/* 페이지 번호 버튼 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
          className={`${styles.pagebutton} ${
            currentPage === page ? styles.pagebuttonactive : ''
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNextGroup}
        disabled={endPage === totalPages}
        className={styles.nextGroup}
      />
    </div>
  );
}
