const submitButton = document.getElementById("submit");
const serviceProvider = document.getElementById("serviceProvider");
const inputDate = document.getElementById("date");
const inputTime = document.getElementById("time");
const inputUsername = document.getElementById("username");
const appointmentList = document.getElementById("appointmentList");

function createListItem(appointment) {
  const listItem = document.createElement("li");
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "حذف";

  // استایل دلخواه حذف
  deleteBtn.style.marginRight = "10px";
  deleteBtn.style.backgroundColor = "#dc2626";
  deleteBtn.style.color = "white";
  deleteBtn.style.border = "none";
  deleteBtn.style.borderRadius = "5px";
  deleteBtn.style.padding = "5px 10px";
  deleteBtn.style.cursor = "pointer";

  listItem.textContent = `${appointment.username} نوبت ${appointment.service} شما در ${appointment.date} و در ساعت ${appointment.time} رزرو شد.`;
  listItem.prepend(deleteBtn);
  appointmentList.appendChild(listItem);

  deleteBtn.addEventListener("click", () => {
    appointmentList.removeChild(listItem);

    const savedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const updated = savedAppointments.filter(item =>
      !(item.username === appointment.username &&
        item.service === appointment.service &&
        item.date === appointment.date &&
        item.time === appointment.time)
    );
    localStorage.setItem("appointments", JSON.stringify(updated));
  });
}

// ثبت نوبت جدید
submitButton.addEventListener("click", () => {
  const service = serviceProvider.value;
  const date = inputDate.value;
  const time = inputTime.value;
  const username = inputUsername.value;

const appointment = { username, service, date, time };

const savedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

// بررسی تکراری بودن
const isDuplicate = savedAppointments.some(item =>
  item.username === appointment.username &&
  item.service === appointment.service &&
  item.date === appointment.date &&
  item.time === appointment.time
);

if (isDuplicate) {
  alert("این نوبت قبلاً ثبت شده!");
} else {
  savedAppointments.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(savedAppointments));
  createListItem(appointment);
}

});

// نمایش نوبت‌های ذخیره‌شده هنگام بارگذاری صفحه
window.addEventListener("load", () => {
  const savedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
  savedAppointments.forEach(createListItem);
});
