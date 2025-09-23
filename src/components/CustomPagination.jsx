import Pagination from "react-bootstrap/Pagination";

export default function CustomPagination({ page, total, onPageChange }) {
  const PagesList = () => {
    let items = [];
    for (let number = 1; number <= total; number++) {
      // ... pagination logic here (e.g., limit number of displayed pages)
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  if (total === 0) {
    return null;
  }

  return (
    <Pagination>
      {page !== 1 && (
        <>
          <Pagination.First onClick={() => onPageChange(1)} />
          <Pagination.Prev onClick={() => onPageChange(page - 1)} />
        </>
      )}
      {PagesList()}
      {page !== total && (
        <>
          <Pagination.Next onClick={() => onPageChange(page + 1)} />
          <Pagination.Last onClick={() => onPageChange(total)} />
        </>
      )}
    </Pagination>
  );
}
