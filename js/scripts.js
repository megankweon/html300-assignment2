


var tasks = [];

var createNewLi = function(description, owner, difficulty) {
  var newTaskLi = "";
        newTaskLi += "<div class='task'>";
          newTaskLi += "<p>Owner: " + owner + "</p><br/>";
          newTaskLi += "<p>Difficulty: " + difficulty + "</p><br/>";
          newTaskLi += "<p>Task Description: " + description + "</p>";
        newTaskLi += "</div>";
     newTaskLi += "<hr />";
   return newTaskLi;
}

for(var i = 0; i < tasks.length; i++) {
  var newLi = createNewLi(tasks[i].description, tasks[i].owner, tasks[i].difficulty);
  $('#to-do-list').append(newLi);
}



var addTask = function() {
  var description = $('#description').val();
  var owner = $('input[name=owner]').val();
  var difficulty = $('#difficulty').val();

  var newTask = {
    "description": description,
    "owner": owner,
    "difficulty": difficulty
  };
  tasks.push(newTask);
  console.log(tasks);

  var newLi = createNewLi(description, owner, difficulty);
  $('#to-do-list').append(newLi);
  drawChart();
}


// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
  var johnTask = 0;
  var meganTask = 0;
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].owner == "John") johnTask++;
    if (tasks[i].owner == "Megan") meganTask++;
    console.log("John: " + johnTask);
    console.log("Megan: " + meganTask);
  }

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addColumn('number', 'Number of Tasks');
  data.addRows([
    ['John', johnTask],
    ['Megan', meganTask]
  ]);

  // Set chart options
  var options = {'title':'Who has more tasks?',
                 'width':400,
                 'height':300};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
