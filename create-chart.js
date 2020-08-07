var data = {
  series: [
    [5, 2, 4, 2, 0]]
};

var availableData = {
  table1: {
    column1: [10, 12, 35, 65, 45],
    column2: [5, 15, 25, 15, 5],
    column3: [3, 22, 16, 75, 19],
    column4: [10, 22, 15, 65, 35],
  },
  labels: {
    days: ["Mond", "Tues", "Thurs", "Frid", "Satur", "Sund"],
    names: ["John", "Jane", "Thomas", "Frid", "Ali", "Salah"]
  }
}

var newChartData = {
  labels: ["label 1", "label 2", "label 3", "label 4", "label 5"],
  series: [
    [5, 2, 4, 2, 0]]
};
var charts = {
  Line: Chartist.Line('.ct-chart', data),
  Bar: Chartist.Bar('.ct-chart1', data),
  Pie: Chartist.Pie('.ct-chart2', { series: [10, 2, 4, 3] }),
  HorizontalBar: Chartist.Bar('.ct-chart3', data, { seriesBarDistance: 10, reverseData: true, horizontalBars: true, axisY: { offset: 70 } }),
  Gauge: Chartist.Pie('.ct-chart5', {
    series: [20, 10, 30, 40]
  }, {
    donut: true,
    donutWidth: 10,
    startAngle: 270,
    total: 200,
    showLabel: false
  }),
  Area: Chartist.Line('.ct-chart4', data, {
    low: 0,
    showArea: true
  })
}
var newChart = new Chartist.Line('#new-chart', data, {
  low: 0,
  showArea: true
});
//-----------------------------------------

//hover
$('.chart-type').hover(
  function () { $(this).addClass('shadow') },
  function () { $(this).removeClass('shadow') })

//--------------------------------------------
//select the chart click
$('.chart-type').click(function () {
  var chartType = $(this).attr("title");
  console.log(chartType);
  switch (chartType) {
    case "Bar":
      $('#new-chart').empty();
      newChart = new Chartist.Bar('#new-chart', newChartData);
      break;
    case "Pie":
      newChart = new Chartist.Pie('#new-chart', { series: [10, 2, 4, 3] });
      break;
    case "Line":
      newChart = new Chartist.Line('#new-chart', newChartData);
      break;
    case "HorizontalBar":
      newChart = new Chartist.Bar('#new-chart', newChartData, { seriesBarDistance: 10, reverseData: true, horizontalBars: true, axisY: { offset: 70 } });
      break;
    case "LineChartArea":
      newChart = new Chartist.Line('#new-chart', newChartData, { low: 0, showArea: true });
      break;
    case "Gauge":
      newChart = new Chartist.Pie('#new-chart', { series: [20, 10, 30, 40] }, { donut: true, donutWidth: 60, startAngle: 270, total: 200, showLabel: false });
      break;
  }
});
//drag element
var yaxisElt=[];
$(function () {
  var draggedElt;
  var parentElt;
  $(".draggable").draggable({
    revert: true ,
    start: function (event, ui) {
      $(this).addClass("bg-danger text-light");
      draggedElt = $(this).text();
      parentElt = $(this).parent().attr('id');
      console.log(draggedElt + "  " + parentElt);
    },
    stop: function (event, ui) {
      $(this).removeClass("bg-danger text-light");
        }
  }
  );
  $(".droppable").droppable({
    drop: function (event, ui) {
      if ($(this).attr('id') == "Y-AXIS") {
      if(!(yaxisElt.includes(draggedElt))){
        yaxisElt.push(draggedElt);
        newChartData["series"][newChartData["series"].length] = availableData[parentElt][draggedElt];
        console.log(newChartData["series"]);
        newChart.update(newChartData)
        $(this).append('<li class="list-group-item y-axis-draggable">' + draggedElt + '</li>');
        $(".y-axis-draggable").draggable({
          stop: function (event, ui) {
            var y_axisdraggedElt=$(this).text();
            console.log(yaxisElt.indexOf(y_axisdraggedElt));
            var index=newChartData["series"].indexOf(availableData["table1"][y_axisdraggedElt]);
            console.log(index);
            delete  newChartData["series"][index];
            console.log( newChartData["series"]);

            newChartData["series"]= newChartData["series"].filter(function(array) {
              return array && array.length ;
            });
            console.log( newChartData["series"]);
            newChart.update(newChartData)
            delete yaxisElt[yaxisElt.indexOf(y_axisdraggedElt)];
            $(this).remove();
              }
        }
        );
        console.log("new series element");
      }
      } else if ($(this).attr('id') == "X-AXIS") {
        newChartData["labels"] = availableData[parentElt][draggedElt];
        newChart.update(newChartData)
        $(this).empty();
        $(this).append('<li class="list-group-item draggable bg-dark text-light">' + draggedElt + '</li>');
        console.log("labels changed");
      }
    }
  });
});
/////////////////////////
//set chart title

