const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
];

let currentMonth = new Date().getMonth(); // Start with the current month
let currentYear = new Date().getFullYear(); // Current year

const calendarBody = document.getElementById('calendarBody');
const monthYear = document.getElementById('monthYear');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');

function renderCalendar(month, year) {
    const firstDay = new Date(year, month).getDay(); // First day of the month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the month

    // Clear the calendar before rendering
    calendarBody.innerHTML = '';

    // Set the header to the current month and year
    monthYear.textContent = `${monthNames[month]} ${year}`;

    // Create a new row
    let row = document.createElement('tr');

    // Fill in empty cells before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        let cell = document.createElement('td');
        row.appendChild(cell);
    }

    // Fill in the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        if (row.children.length === 7) { // Start a new row after 7 days (week)
            calendarBody.appendChild(row);
            row = document.createElement('tr');
        }

        let cell = document.createElement('td');
        cell.textContent = day;

        // Highlight the current day
        if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            cell.style.backgroundColor = '#00b32d';
            cell.style.color = '#fff';
            cell.style.borderRadius = '50%';
        }

        row.appendChild(cell);
    }

    // Append the remaining row
    calendarBody.appendChild(row);
}

// Event listeners for navigation buttons
prevMonthButton.addEventListener('click', function () {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

nextMonthButton.addEventListener('click', function () {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

// Initialize the calendar
renderCalendar(currentMonth, currentYear);