import Pagination from "react-bootstrap/Pagination";

export default function CustomPagination({ page, total, onPageChange }) {
  const PagesList = () => {
    let items = [];
    for (let number = 1; number <= total; number++) {
      // ... pagination logic here (e.g., limit number of displayed pages)
      const comp = (
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
      if (number === 1 || number === total) {
        items.push(comp);
        continue;
      }
      if (
        total >= 5 &&
        (number === page || (number < page + 3 && number > page - 3))
      ) {
        items.push(comp);
      } else if (number === page - 3 || number === page + 3) {
        items.push(<Pagination.Ellipsis key={number} disabled />);
      }
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
