export function dummyValues() {
  return {
    name: "New Alarm",
    time: {
      selected: {
        is_date: true,
        value: JSON.stringify(new Date()).replace(new RegExp('"', "g"), ""),
      },
      time: JSON.stringify(new Date()).replace(new RegExp('"', "g"), ""),
    },
    sound: "not implemented",
    vibration: {
      enabled: false,
      pattern: {
        name: "Basic call",
        value: [0, 1250],
      },
    },
    reminder: {
      enabled: true,
      intervall: {
        value: 5,
      },
      repeat: {
        value: 3,
      },
    },
    active: true,
  };
}

export function formatDate(date, format) {
  let week_days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  let months = [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez",
  ];
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  let h = date.getHours();
  let M = date.getMinutes();
  let s = date.getSeconds();
  let mname = months[m - 1];
  let dname = week_days[date.getDay()];
  format = format.replace("EEE", dname);
  format = format.replace("dd", d < 10 ? "0" + d : d);
  format = format.replace("mmm", mname);
  format = format.replace("mm", m < 10 ? "0" + m : m);
  format = format.replace("yyyy", y);
  format = format.replace("hh", h < 10 ? "0" + h : h);
  format = format.replace("MM", M < 10 ? "0" + M : M);
  format = format.replace("ss", s < 10 ? "0" + s : s);
  return format;
}

export function parseDateDiff(diff) {
  var seconds = Math.floor(diff / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;

  return { days, hours, minutes };
}

export function weekdayToNumber(weekday) {
  switch (weekday) {
    case "Montag":
      return 1;
    case "Dienstag":
      return 2;
    case "Mittwoch":
      return 3;
    case "Donnerstag":
      return 4;
    case "Freitag":
      return 5;
    case "Samstag":
      return 6;
    case "Sonntag":
      return 7;
  }
  return 0;
}
