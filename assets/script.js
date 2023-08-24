// Get the current date and format it
var today = moment().format("dddd, MMMM Do YYYY ");

// Get the current time and format it
var now = moment().format("H A");

// Display the current day
$("#currentDay").text(today);

/* planWorkday entries for each hour of the workday */
var planWorkday = [
  // Each entry represents a time block with its associated event
  { time: "9 AM", event: "" },
  { time: "10 AM", event: "" },
  { time: "11 AM", event: "" },
  { time: "12 PM", event: "" },
  { time: "1 PM", event: "" },
  { time: "2 PM", event: "" },
  { time: "3 PM", event: "" },
  { time: "4 PM", event: "" },
  { time: "5 PM", event: "" },
];

/* Check Local Storage for saved events */
var workEvents = JSON.parse(localStorage.getItem("workDay"));
if (workEvents) {
  planWorkday = workEvents;
}

/* Render Time Blocks and Populate Data */
planWorkday.forEach(function(timeBlock, index) {
  var timeLabel = timeBlock.time;
  var blockColor = colorRow(timeLabel);
  
  // Create the HTML for each time block
  var row =
    '<div class="time-block" id="' +
    index +
    '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
    timeLabel +
    '</div><textarea class="form-control ' +
    blockColor +
    '">' +
    timeBlock.event +
    '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';
  
  // Add the created row to the container
  $(".container").append(row);
});

/* Determine row color based on current time */
function colorRow(time) {
  var planNow = moment(now, "H A");
  var planEntry = moment(time, "H A");
  
  if (planNow.isBefore(planEntry) === true) {
    return "future";
  } else if (planNow.isAfter(planEntry) === true) {
    return "past";
  } else {
    return "present";
  }
}

/* Save user-entered events */
$(".saveBtn").on("click", function() {
  var blockID = parseInt($(this).closest(".time-block").attr("id"));
  var userEntry = $.trim(
    $(this)
      .parent()
      .siblings("textarea")
      .val()
  );
  
  // Update the event in the planWorkday array
  planWorkday[blockID].event = userEntry;
  
  // Save the updated planWorkday array to local storage
  localStorage.setItem("workDay", JSON.stringify(planWorkday));
});
