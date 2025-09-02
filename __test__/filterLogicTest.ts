import dayjs from 'dayjs';

const mockTodoData = [
  {
    recno: 1,
    title: 'Test Todo',
    description: 'Test Description',
    dueDate: '2025-09-01',
    completed: false,
    priority: 1,
    position: 'A',
  },
  {
    recno: 2,
    title: 'Another Todo',
    description: 'Another Description',
    dueDate: '2025-09-02',
    completed: true,
    priority: 2,
    position: 'B',
  },
];

const filterByDueDateRangeStart = dayjs('2025-09-01');
const filterByDueDateRangeEnd = dayjs('2025-09-30');

function filterItem(item, filterByDueDateRangeStart, filterByDueDateRangeEnd) {
  let passed = true;
  // Only check due date range
  if (filterByDueDateRangeStart !== null && filterByDueDateRangeEnd !== null) {
    const dueDate = new Date(item.dueDate);
    const startDate = new Date(filterByDueDateRangeStart.toDate());
    const endDate = new Date(filterByDueDateRangeEnd.toDate());
    passed &&= dueDate >= startDate && dueDate <= endDate;
  } else passed &&= true;
  return passed;
}

const filtered = mockTodoData.filter(item => filterItem(item, filterByDueDateRangeStart, filterByDueDateRangeEnd));
console.log('Filtered todos:', filtered);

