import usePaginationStore from '@/stores/usePaginationStore';
import styles from './pagination.module.css';

export default function Pagination() {
  // 한번에 5 페이지 씩 보여주게끔 설계했어요. 첫번째 페이지는 1-5, 화살표 누르면 6-10 이 보이게 했습니다.
  // Pagination 컴포넌트 사용하실때 바로 아래 코드처럼 구조 분해 할당으로 (custom hook처럼) 가져와서 쓰시면 됩니다.
  // usePaginationStore는 zustand 라이브러라를 사용해서 구현한겁니다. 위에 import문도 보셔서 import 해서 쓰시면 됩니다.

  const { currentPage, totalPages, setPage } = usePaginationStore();

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
