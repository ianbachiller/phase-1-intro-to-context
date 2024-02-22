//1
function createEmployeeRecord(employeeInfo) {
  const employeeRecord = {};
  const keys = [
    "firstName",
    "familyName",
    "title",
    "payPerHour",
    "timeInEvents",
    "timeOutEvents",
  ];
  keys.forEach(function (key, index) {
    if (key === "timeInEvents" || key === "timeOutEvents") {
      employeeRecord[key] = []
    } else {
      employeeRecord[key] = employeeInfo[index]
    }
  })
  return employeeRecord
}

createEmployeeRecord(testEmployee)

//2
function createEmployeeRecords(employeeInfos) {
  let employeeRecords = employeeInfos.map(function (employeeInfo) {
    return createEmployeeRecord(employeeInfo)
  })
  return employeeRecords
}

createEmployeeRecords(employeesInfos)

//3
function createTimeInEvent(timeTestE, timeInTestT) {
  const timeInEventObject = {
    type: "TimeIn",
    hour: parseInt(timeInTestT.slice(11, 15), 10),
    date: timeInTestT.slice(0, 10),
  };

  timeTestE.timeInEvents.push(timeInEventObject);
  return timeTestE;
}

createTimeInEvent(timeInTestEmployee, timeInTestTime);

//4
function createTimeOutEvent(timeTestE, timeOutTestT) {
  const timeOutEventObject = {
    type: "TimeOut",
    hour: parseInt(timeOutTestT.slice(11, 15), 10),
    date: timeOutTestT.slice(0, 10),
  };
  timeTestE.timeOutEvents.push(timeOutEventObject);
  return timeTestE;
}

createTimeOutEvent(timeOutTestEmployee, timeOutTestTime);

//5
function hoursWorkedOnDate(employeeRecord, date) {
  let foundTimeIn = employeeRecord.timeInEvents.find((obj) => obj.date == date)
  let foundTimeOut = employeeRecord.timeOutEvents.find((obj) => obj.date == date)
  return ((foundTimeOut.hour - foundTimeIn.hour)/100)
}

hoursWorkedOnDate(hoursWorkedEmployee, hoursWorkedDate);

//6
function wagesEarnedOnDate(wagesEarnedEmployee, wagesEarnedDate){
  let foundEmployeePayPerHour = wagesEarnedEmployee.payPerHour
  let hoursWorked = hoursWorkedOnDate(wagesEarnedEmployee, wagesEarnedDate)
  let wage = foundEmployeePayPerHour*hoursWorked
  console.log(wage)
  return wage
}

wagesEarnedOnDate(wagesEmployee, wagesEarnedDate)

//7
function allWagesFor(allWagesForEmployee){
  let totalWage = 0
  allWagesForEmployee.timeInEvents.forEach((event) => { //to access the date lol
    const dailyWage = wagesEarnedOnDate(allWagesForEmployee, event.date);
    totalWage += dailyWage
  })
  console.log(`Your totalWage is ${totalWage}`)
  return totalWage
}

allWagesFor(allWagesEmployee)

//8
function calculatePayroll(calculatePayrollEmployees){
  let grandTotal = 0
  calculatePayrollEmployees.forEach((element) => {
    let dailyEmpTotal = allWagesFor(element)
    grandTotal += dailyEmpTotal
  })
  return grandTotal
}

calculatePayroll(calculateEmployees)