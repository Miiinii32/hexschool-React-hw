function Pagination({ pagination, onChangePages }) {
  const handleChangePages = (e, page) => {
    e.preventDefault();
    onChangePages(page);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${!pagination.has_pre && "disabled"}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => handleChangePages(e, pagination.current_page - 1)}
          >
            前一頁
          </a>
        </li>
        {Array.from({ length: pagination.total_pages }, (_, index) => (
          <li
            className={`page-item ${index + 1 === pagination.current_page && "active"}`}
            key={index}
          >
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                handleChangePages(e, index + 1);
              }}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li className={`page-item ${!pagination.has_next && "disabled"}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => handleChangePages(e, pagination.current_page + 1)}
          >
            下一頁
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default Pagination;
