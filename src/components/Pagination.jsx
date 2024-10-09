import Pagination from 'react-bootstrap/Pagination';

export default function _Pagination() {
  const active = 1;
  const count = 10;
  let items = [];

  for (let number = 1; number <= count; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      {items[0]}
      <Pagination.Ellipsis />
      {items.slice(1, -1)}
      <Pagination.Ellipsis />
      {items.slice(-1)}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}
