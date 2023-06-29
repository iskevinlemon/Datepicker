document.getElementById("my-datepicker").innerHTML=
`
<div class="date-picker-wrapper">
  <input type="text" class="selected-date" readonly>
  <div class="dates-container">
    <div class="month">
      <span class="prev-month">
        <button class="date-picker-toggle-btn">Prev</button>
      </span>
      <span class="month-item"></span>
      <span class="next-month">
        <button class="date-picker-toggle-btn">Next</button>
      </span>
    </div>
    <div class="days-of-week">
      <span>Sun</span>
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
    </div>
    <div class="days-container"></div>
  </div>
</div>
`
;

document.body.innerHTML+=
`
<style>
.date-picker-wrapper {
  position: relative;
  display: inline-block;
  font-family: Arial, Helvetica, sans-serif !important;
}

.selected-date {
  padding: 5px 10px;
  border-radius: 3px;
  border: 1px solid lightgray;
}

.selected-date {
  cursor: pointer;
}

.selected-date:hover{
  border: 1px solid #529FFB;
}

.dates-container {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 255px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  height: 280px;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.month {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.days-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.day {
  cursor: pointer;
  padding: 10px 10px;
  text-align: center;
  /* border: 1px solid lightgray; */
  font-size: 11px;
}

.day:hover {
  background-color: #eeeeee;
  padding: 10px 10px;
  /* border-radius: 50px; */
  border-radius: 3px;
}

.day.selected {
  background-color: #529FFB;
  /* border-radius: 50px; */
  /* border-radius: 50px; */
  border-radius: 3px;
  color: #fff;
  padding: 10px 10px 0px 10px !important;
}

.days-of-week {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 10px;
  text-align: center;
}

.days-of-week span {
  width: calc(100% / 7);
  text-align: center;
}

.empty-day {
  visibility: hidden;
}

.day.current-day {
  background-color: #fff;
  border: 1px solid lightgray;
  padding: 10px 10px;
  /* border-radius: 50px; */
  color: #000;
  border-radius: 3px;
}

.date-picker-toggle-btn {
  border: none;
  padding: 3px 10px;
  color: darkgray;
  background-color: #fff;
  cursor: pointer;
}

.date-picker-toggle-btn:hover {
  text-decoration: underline;
}

.date-picker-toggle-btn:active {
  color: #529FFB;
}
</style>
`;

const date_picker_ele = document.querySelector(".date-picker-wrapper");
const selected_date_ele = document.querySelector(".selected-date");
const dates_ele = document.querySelector(".dates-container");
const month_ele = document.querySelector(".month .month-item");
const next_month_ele = document.querySelector(".month .next-month");
const prev_month_ele = document.querySelector(".month .prev-month");
const days_ele = document.querySelector(".days-container");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

month_ele.textContent = months[month] + " " + year;

selected_date_ele.value = formatDate(date);

populateDates();

date_picker_ele.addEventListener("click", toggleDatePicker);
next_month_ele.addEventListener("click", goToNextMonth);
prev_month_ele.addEventListener("click", goToPrevMonth);

function toggleDatePicker() {
//   dates_ele.style.display = dates_ele.style.display === "none" ? "block" : "none";
  dates_ele.style.display = dates_ele.style.display === "none" ? "block" : "none";
}

function goToNextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  month_ele.textContent = months[month] + " " + year;
  populateDates();
//   dates_ele.style.display = "block";
    toggleDatePicker();
}

function goToPrevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  month_ele.textContent = months[month] + " " + year;
  populateDates();
//   dates_ele.style.display = "block";
    toggleDatePicker();
}

function populateDates() {
  days_ele.innerHTML = "";
  let total_days;

  if (month == 1) {
    total_days = 28;
  } else if (month % 2 === 0) {
    total_days = 31;
  } else {
    total_days = 30;
  }

  // Add empty placeholders for days before the 1st of the month
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  for (let i = 0; i < firstDayOfMonth; i++) {
    const empty_day_element = document.createElement("div");
    empty_day_element.classList.add("empty-day");
    days_ele.appendChild(empty_day_element);
  }

  for (let i = 0; i < total_days; i++) {
    const day_element = document.createElement("div");
    day_element.classList.add("day");
    day_element.textContent = i + 1;

    if (
      selectedDay == i + 1 &&
      selectedYear == year &&
      selectedMonth == month
    ) {
      day_element.classList.add("selected");
    }

    // if (i + 1 === day && month === new Date().getMonth() && year === new Date().getFullYear()) {
    //   day_element.classList.add("current-day");
    // }

    day_element.addEventListener("click", function () {
      selectedDate = new Date(year, month, i + 1);
      selectedDay = i + 1;
      selectedMonth = month;
      selectedYear = year;

      selected_date_ele.value = formatDate(selectedDate);

      populateDates();
      toggleDatePicker();
    });

    days_ele.appendChild(day_element);
  }
}


function formatDate(selectedDate) {
  let day = selectedDate.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  let month = selectedDate.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  let year = selectedDate.getFullYear();

  return day + " / " + month + " / " + year;
}
