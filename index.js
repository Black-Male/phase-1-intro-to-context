// Your code here
function createEmployeeRecord(Employeeinfo){
   const obj = {
    firstName: Employeeinfo[0],
    familyName: Employeeinfo[1],
    title: Employeeinfo[2],
    payPerHour: Employeeinfo[3],
    timeInEvents: [] ,
    timeOutEvents: []
   }
   return obj
}

function createEmployeeRecords(Arr){
   let arguement = []
   //arguement[createEmployeeRecord()]

   Arr.forEach((array) => {
      let newVals = createEmployeeRecord(array)
      arguement.push(newVals)
   });
   return arguement
}

function createTimeInEvent(objToBeFilled, date){
   let timing = date.split(' ')[1]
   let dateinfo = date.split(' ')[0] 
   
   const timeInInfo = {
      type : "TimeIn",
      hour : Number(timing),
      date : dateinfo
   }
   // let z = objToBeFIlled
   // z = []
   // z.push(timeInInfo)
   // return z
   let z = objToBeFilled.timeInEvents
   z.push(timeInInfo)
   return objToBeFilled
}

function createTimeOutEvent(EmployeeCard, date){
   let timing = date.split(' ')[1]
   let dateinfo = date.split(' ')[0] 
   const timeOutInfo = {
      type : "TimeOut",
      hour : Number(timing),
      date : dateinfo
   }
   let z = EmployeeCard.timeOutEvents
   z.push(timeOutInfo)
   return EmployeeCard
   
}
function hoursWorkedOnDate(EmployeeCard, dateInQuestion){
   let timeIn = EmployeeCard.timeInEvents
   let timeOut = EmployeeCard.timeOutEvents
   let entryHour;
   let exitHour;

   for (const timeInInfo of timeIn){
      if (timeInInfo.date === dateInQuestion){
         entryHour = timeInInfo.hour
      }      
   }

   for (const timeOutInfo of timeOut){
      if (timeOutInfo.date === dateInQuestion){
         exitHour = timeOutInfo.hour
      }
   }
   return(exitHour - entryHour)/100
   // is divided by 100 because time is in military hours and is much simpler to divide at the end
   // i.e exit hour is 1700hrs entry hour is 1200 hrs result without /100 will be 500 and we can't show 500 hrs of work

}

function wagesEarnedOnDate(EmployeeCard, dateInQuestion){
   let shiftTime =   hoursWorkedOnDate(EmployeeCard, dateInQuestion)
   let salary = shiftTime * EmployeeCard.payPerHour
   return salary
}

function allWagesFor(EmployeeCard){
   //let datesOnShift =  EmployeeCard.timeInEvents
   // let clone = datesOnShift.map(dateInfo => {

   // })
   let totalSalary = 0  
   let datesOnShift = EmployeeCard.timeInEvents.map(dataCollection => {
      let dateWorked = dataCollection.date
      return wagesEarnedOnDate(EmployeeCard,dateWorked)
   })
   const totalEmployeSalary = datesOnShift.reduce((previousValue, currentValue) => {
      return previousValue+currentValue
   })
   return totalEmployeSalary
}

function calculatePayroll(EmployeeCard){
   let employeeSalaries = EmployeeCard.map(dataCollection => {
      return allWagesFor(dataCollection)
   }) 
   let totalEmployeSalaries = employeeSalaries.reduce((previousValue, currentValue) => {
      return previousValue+currentValue
   })
   return totalEmployeSalaries
}