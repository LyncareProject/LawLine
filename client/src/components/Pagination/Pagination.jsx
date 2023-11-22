import styles from "./Pagination.module.css";

const Pagination = ({ totalPosts, postsPerPage, currentPage, setPage }) => {
  const pageNumbers = [];
  const totalPage = Math.ceil(totalPosts / postsPerPage);

  // 시작 페이지와 끝 페이지 계산
  let startPage = Math.max(1, currentPage - 5);
  let endPage = Math.min(totalPage, currentPage + 4);

  if (totalPage <= 10) {
    startPage = 1;
    endPage = totalPage;
  } else {
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPage) {
      startPage = totalPage - 9;
      endPage = totalPage;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.Pagination}>
      <button
        onClick={() => {
          setPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className={`${currentPage === 1 && styles.Disabled} ${styles.Button} `}
      >
        &lt;
      </button>

      {pageNumbers.map((page, i) => (
        <button
          className={`${i + 1 === currentPage && styles.Active} ${
            styles.Button
          }`}
          key={i}
          onClick={() => setPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => {
          setPage(currentPage + 1);
        }}
        disabled={currentPage === endPage}
        className={`${currentPage === endPage && styles.Disabled} ${
          styles.Button
        } `}
      >
        &gt;
      </button>
    </div>
  );
};
export default Pagination;
