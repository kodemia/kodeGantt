console.log(calendarActivities)

var weekCount = 1;
$.each(calendarActivities, function(index, value) {

    console.log(weekCount)
    $("#calendar-accordion>.card").append(`
        <div class="card-header" id="${index}">
            <h5 class="mb-0">
            <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${weekCount}" aria-expanded="true" aria-controls="collapse-${weekCount}">
            ${index}
            </button>
            </h5>
        </div>
        <div id="collapse-${weekCount}" class="collapse" aria-labelledby="${index}" data-parent="#calendar-accordion">
            <div class="card-body d-flex justify-content-between day-wrapper">
                
            </div>
        </div>
    `)
    $.each(value, function(index, value) {
        let currentDay = index;
        $("#collapse-" + weekCount).find(".day-wrapper").append(`
            <div class="card day-schedule">
                <div class="card-body">
                    <h5 class="card-title">${value.date}</h5>
                    <p class="card-text">
                         ${value.topic} <br /> (${value.mentor || ''})
                    </p>
                </div>
                <ul class="list-group list-group-flush activities-detail-${index}"></ul>
            </div>

        `)
        let subthemes = value.subthemes;
        $.each(subthemes,function(index,value){
            console.log(value);
            $("#collapse-" + weekCount).find(".activities-detail-"+currentDay).append(`
                <li class="list-group-item">${value}</li>
            `)
        })
        /*for(i=0; i=subthemes.length; i++){
            console.log(subthemes[i])
            $("#collapse-" + weekCount).find(".activities-detail").append(`
                <li class="list-group-item">${value.subthemes[i]}</li>
            `)
        }*/
    })

    weekCount = weekCount + 1

});

