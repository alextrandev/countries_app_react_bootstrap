import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

export default function _Pagination() {
  const [active, setActive] = useState(1);
  const count = 300; // Total number of pages

  const Item = ({ number }) => {
    return (
      <Pagination.Item
        key={number}
        active={active === number}
        onClick={() => setActive(number)}
      >
        {number}
      </Pagination.Item>
    )
  }


  {/* Show items based on the logic */ }
  let start, end;
  if (active < 5) {
    start = 2;
    end = 6;
  } else if (active > count - 4) {
    start = count - 5;
    end = count - 1;
  } else {
    start = active - 2;
    end = active + 2;
  }

  // this array hold the current shown item based on currently active
  let displayItems = [];
  for (let number = start; number <= end; number++) {
    displayItems.push(
      <Item number={number} />
    );
  }

  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />

      {/* The first item should always be shown */}
      <Item number={1} />

      {/* show the Ellipsis when active is not the first 4 */}
      {active > 4 && <Pagination.Ellipsis disabled />}

      {displayItems}

      {/* show the Ellipsis when active is not the last 4 */}
      {active < count - 3 && <Pagination.Ellipsis disabled />}

      {/* The last item should always be shown */}
      <Item number={count} />

      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}
