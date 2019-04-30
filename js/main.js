$(document).ready(function() {
    //console.log(monthsArray);
    fillGrid();
    fillActivities("bootcampMern1","red-line");
    fillActivities("bootcampVue1","blue-line");
})

const fillGrid = ()=>{
    $("#calendar-gantt .grid-wrapper").empty();
    monthsArray.forEach(function(value, index) {
        //console.log(value);
        $("#calendar-gantt .grid-wrapper").append(`
            <div class="month-wrapper" data-month-name="${value.name}" data-month-index="${index}">
                <h1 class="month-name">${value.name}</h1>
                <div class="days-wrapper"></div>
            </div>
        `)
        let totalDays = value.totalDays;
        let dayIndex = value.startingDay;
        let dayNumber = value.startingDate;
        for (i = 0; i < totalDays; i++) {
            let dayString;
            if(dayNumber < 10){
                dayString = "0"+dayNumber;
            } else {
                dayString = dayNumber;
            }
            $(`.month-wrapper:eq('${index}') .days-wrapper`).append(`
                    <div class="day-item" data-item-date=${dayString+"/"+value.monthNumber}>
                        <span>${daysArray[dayIndex]}</span>  
                        <span>${dayNumber}</span>
                        <div class="activities-wrapper"></div>
                    </div>
                `)
            if (dayIndex < 5) {
                dayIndex++
            } else {
                $(`.month-wrapper:eq('${index}') .days-wrapper`).find(".day-item").last().addClass("saturday")
                dayIndex = 0;
                dayNumber++
            }
            dayNumber++
        }
    })
}

const fillActivities = (activityId, itemClass) => {
    $.each(calendarActivities[activityId], function(key, value) {
        //console.log(value);
        value.forEach(function(value, index) {
            let assignedDate = value.date;
            let currentSubthemes = value.subthemes;
            console.log(assignedDate);
            console.log(value);
            console.log(currentSubthemes);
            $(".days-wrapper").find(`[data-item-date='${assignedDate}']`).find(".activities-wrapper").append(`
                    <div class="activity-item ${itemClass}" data-activity-id="${activityId}" onclick="toggleDropDown(this)">
                        <h2 class="activity-title">${value.topic}</h2>
                        <ul class="activities-list"></ul>
                    </div>
                `)
            currentSubthemes.forEach(function(value,index){
                $(".days-wrapper").find(`[data-item-date='${assignedDate}']`).find(`[data-activity-id='${activityId}']`).find(".activities-list").append(`
                        <li>${value}</li>
                    `)
            })
        })
    })
}

const toggleDropDown = (element) => {
    console.log("message");
    if ($(element).hasClass("active")) {
        return false
    } else {
        $(".activities-list").removeClass("active");
        $(element).find(".activities-list").addClass("active")
    }
}