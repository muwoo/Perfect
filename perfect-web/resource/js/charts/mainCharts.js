var myApp = angular.module('myApp');
myApp.controller('chartsCtrl',function ($scope) {
  $scope.params = {type:'pie', height:154, sliceColors:['#23b7e5','#eaeeea']};
  $scope.splineParams = {
    colors: ['#23b7e5'],
    series: { shadowSize: 3 },
    xaxis:{
      font: { color: '#ccc' },
      position: 'bottom',
      ticks: [
        [ 1, 'Jan' ], [ 2, 'Feb' ], [ 3, 'Mar' ], [ 4, 'Apr' ], [ 5, 'May' ], [ 6, 'Jun' ], [ 7, 'Jul' ], [ 8, 'Aug' ], [ 9, 'Sep' ], [ 10, 'Oct' ], [ 11, 'Nov' ], [ 12, 'Dec' ]
      ]
    },
    yaxis:{ font: { color: '#ccc' } },
    grid: { hoverable: true, clickable: true, borderWidth: 0, color: '#ccc' },
    tooltip: true,
    tooltipOpts: { content: '%x.1 is %y.4',  defaultTheme: false, shifts: { x: 0, y: 20 } }
  };
  $scope.barParams = {bars: { show: true, barWidth: 0.6, fillColor: { colors: [{ opacity: 0.5 }, { opacity: 0.9}] }  },
    xaxis: { font: { color: '#ccc' } },
    yaxis: { font: { color: '#ccc' }, min: -2, max: 2 },
    grid: { hoverable: true, clickable: true, borderWidth: 0, color: '#ccc' },
    series: { shadowSize: 1 },
    tooltip: true
  };
  $scope.orderBarParams = {
    bars: { show: true, fill: true, lineWidth: 1, order: 1, fillColor: { colors: [{ opacity: 0.5 }, { opacity: 0.9}] } },
    colors: ['#23b7e5', '#27c24c', '#7266ba'],
    series: { shadowSize: 1 },
    xaxis:{ font: { color: '#ccc' } },
    yaxis:{ font: { color: '#ccc' } },
    grid: { hoverable: true, clickable: true, borderWidth: 0, color: '#ccc' },
    tooltip: true
  }

  $scope.d = [ [1,6.5],[2,6.5],[3,7],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7],[11,6.8],[12,7] ];

  $scope.d0_1 = [ [0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7] ];

  $scope.d0_2 = [ [0,4],[1,4.5],[2,7],[3,4.5],[4,3],[5,3.5],[6,6],[7,3],[8,4],[9,3] ];

  $scope.d1_1 = [ [10, 120], [20, 70], [30, 70], [40, 60] ];

  $scope.d1_2 = [ [10, 50],  [20, 60], [30, 90],  [40, 35] ];

  $scope.d1_3 = [ [10, 80],  [20, 40], [30, 30],  [40, 20] ];

  $scope.d2 = [];

  for (var i = 0; i < 20; ++i) {
    $scope.d2.push([i, Math.sin(i)]);
  }

  $scope.d3 = [
    { label: "iPhone5S", data: 40 },
    { label: "iPad Mini", data: 10 },
    { label: "iPad Mini Retina", data: 20 },
    { label: "iPhone4S", data: 12 },
    { label: "iPad Air", data: 18 }
  ];

  $scope.refreshData = function(){
    $scope.d0_1 = $scope.d0_2;
  };

  $scope.getRandomData = function() {
    var data = [],
      totalPoints = 150;
    if (data.length > 0)
      data = data.slice(1);
    while (data.length < totalPoints) {
      var prev = data.length > 0 ? data[data.length - 1] : 50,
        y = prev + Math.random() * 10 - 5;
      if (y < 0) {
        y = 0;
      } else if (y > 100) {
        y = 100;
      }
      data.push(y);
    }
    // Zip the generated y values with the x values
    var res = [];
    for (var i = 0; i < data.length; ++i) {
      res.push([i, data[i]])
    }
    return res;
  }

  $scope.d4 = $scope.getRandomData();

});
