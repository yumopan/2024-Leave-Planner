const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const leaveCounter = document.getElementById("leaveCounter");
const calendarDiv = document.getElementById("calendar");
const resetButton = document.getElementById("resetButton");
let totalSelectedDays = 0;

const publicHolidays = [
  "1/1/2024", "10/2/2024", "11/2/2024", "12/2/2024",
  "29/3/2024", "10/4/2024", "1/5/2024", "22/5/2024",
  "17/6/2024", "9/8/2024", "31/10/2024", "25/12/2024"
];

const updateCounter = () => {
  leaveCounter.textContent = `Leave selected: ${totalSelectedDays}`;
};

const createCalendar = () => {
  months.forEach((month, index) => {
    const monthDiv = document.createElement("div");
    monthDiv.classList.add("month");

    const header = document.createElement("h3");
    header.textContent = month;
    monthDiv.appendChild(header);

    const daysCount = daysInMonth(2024, index);
    const firstDay = new Date(2024, index, 1).getDay();

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    daysOfWeek.forEach(day => {
      const th = document.createElement("th");
      th.textContent = day;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    let day = 1;
    for (let i = 0; day <= daysCount; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 7 && day <= daysCount; j++) {
        const cell = document.createElement("td");
        if (i === 0 && j < firstDay) {
          cell.textContent = "";
        } else {
          cell.textContent = day;
          cell.dataset.date = `${index + 1}/${day}/2024`; // Store the date in dataset
          const dateString = `${day}/${index + 1}/2024`; // Adjust date format for comparison
          day++;

          if (publicHolidays.includes(dateString)) {
            cell.classList.add("public-holiday");
          }

          if (j === 0 || j === 6) {
            cell.classList.add("weekend");
          }

          cell.addEventListener("click", () => {
            if (cell.classList.contains("weekend")) {
              if (cell.classList.contains("selected")) {
                cell.classList.remove("selected");
                cell.style.backgroundColor = ''; // Reset background color for weekends
              } else {
                cell.classList.add("selected");
                cell.style.backgroundColor = 'lightgreen'; // Shade weekends in green when selected
              }
            } else if (!cell.classList.contains("public-holiday")) {
              if (cell.classList.contains("selected")) {
                cell.classList.remove("selected");
                totalSelectedDays--;
              } else {
                cell.classList.add("selected");
                totalSelectedDays++;
              }
              updateCounter();
            }
          });
        }
        row.appendChild(cell);
      }
      table.appendChild(row);
    }

    monthDiv.appendChild(table);
    calendarDiv.appendChild(monthDiv);
  });
};

resetButton.addEventListener("click", () => {
  const selectedCells = document.querySelectorAll('.selected');
  selectedCells.forEach(cell => {
    cell.classList.remove('selected');
    if (cell.classList.contains('weekend')) {
      cell.style.backgroundColor = ''; // Reset background color for weekends on reset
    }
  });
  totalSelectedDays = 0;
  updateCounter();
});

createCalendar();
