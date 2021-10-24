let calendar = document.querySelector('.calendar');

document.querySelector('.dark-mode-switch').onclick = () => {
  document.querySelector('body').classList.toggle('dark');
  document.querySelector('body').classList.toggle('light');
  console.log('toggle');
};

isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

getFebDays = (year) => {
  return isLeapYear ? 29 : 28;
};

const month_names = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

let month_picker = document.querySelector('.month-picker');

let currentDate = new Date();

generateCalendar = (month, year) => {
  month = month || currentDate.getMonth();
  year = year || currentDate.getFullYear();

  let calendar_day = document.querySelector('.calendar-days');
  let calendar_header_year = document.querySelector('#year');

  const days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  calendar_day.innerHTML = ''

  month_picker.innerHTML = month_names[month];
  calendar_header_year.innerHTML = year;

  //get first day of month

  let firstDayOfMonthInWeek = new Date(year, month, 1);

  console.log(year, month, firstDayOfMonthInWeek.getDay());

  for (
    let i = 0;
    i < days_of_month[month] + firstDayOfMonthInWeek.getDay();
    i++
  ) {
    let day = document.createElement('div');
    if (i >= firstDayOfMonthInWeek.getDay()) {
      day.classList.add('calendar-day-hover');
      day.innerHTML = i - firstDayOfMonthInWeek.getDay() + 1;
      day.innerHTML += `<span></span> <span></span> <span></span> <span></span>`;

      if (
        i - firstDayOfMonthInWeek.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add('curr-date');
      }
    }
    calendar_day.appendChild(day);
  }
};

let monthPicker = calendar.querySelector('.month-picker');
let monthList = calendar.querySelector('.month-list');

month_names.forEach((child) => {
  let month = document.createElement('div');
  month.innerHTML = `<div month-name="${child}">${child}</div>`;

  month.onclick = () => {
    monthList.classList.remove('show');
    generateCalendar(month_names.indexOf(child), currentDate.getFullYear());
  };

  monthList.appendChild(month);
});

monthPicker.onclick = () => {
  monthList.classList.add('show');
};

let curr_month = {value: currentDate.getMonth()}
let curr_year = {value: currentDate.getFullYear()}

document.querySelector('#pre-year').onclick=()=>{
  --curr_year.value;
  generateCalendar(currentDate.getMonth(), curr_year.value)
}
document.querySelector('#next-year').onclick=()=>{
  ++curr_year.value;
  generateCalendar(currentDate.getMonth(), curr_year.value)
}

generateCalendar();
