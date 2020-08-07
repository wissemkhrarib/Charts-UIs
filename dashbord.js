var data = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  series: [
    [12, 9, 7, 8, 5],
    [2, 1, 3.5, 7, 3],
    [1, 3, 4, 5, 6]
  ]
};
var lineChart = new Chartist.Line('.grid-chart', {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  series: [
    [12, 9, 7, 8, 5],
    [2, 1, 3.5, 7, 3],
    [1, 3, 4, 5, 6]
  ]
}, {
  fullWidth: true,
  chartPadding: {
    right: 40
  }
});
var barChart = new Chartist.Bar('.bar-chart', data, { seriesBarDistance: 10, reverseData: true, horizontalBars: true, axisY: { offset: 70 } });
var pieChart = new Chartist.Pie('.chart-pie', { series: [10, 2, 4, 3] });
var grid = GridStack.init({
  alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ),
  resizable: {
    handles: 'e, se, s, sw, w'
  },
  removable: '#trash',
  removeTimeout: 100,
  acceptWidgets: '.newWidget'
});

grid.on('added', function (e, items) { log('added ', items) });
grid.on('removed', function (e, items) { log('removed ', items) });
grid.on('change', function (e, items) { log('change ', items) });
function log(type, items) {
  lineChart.update();
  pieChart.update();
  barChart.update();
  var str = '';
  items.forEach(function (item) { str += ' (x,y)=' + item.x + ',' + item.y; });
  console.log(type + items.length + ' items.' + str);
}

// TODO: switch jquery-ui out
$('.newWidget').draggable({
  revert: 'invalid',
  scroll: false,
  appendTo: 'body',
  helper: 'clone'
});