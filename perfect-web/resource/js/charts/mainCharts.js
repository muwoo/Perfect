var myApp = angular.module('myApp');

myApp.controller('chartsCtrl', function ($scope, server, formatDate, dynamic) {
// 静态数据 绘制静态图表
  $scope.params = {type: 'pie', height: 154, sliceColors: ['#23b7e5', '#eaeeea']};
  $scope.splineParams = {
    colors: ['#23b7e5'],
    series: {shadowSize: 3},
    xaxis: {
      font: {color: '#ccc'},
      position: 'bottom',
      ticks: [
        [1, 'Jan'], [2, 'Feb'], [3, 'Mar'], [4, 'Apr'], [5, 'May'], [6, 'Jun'], [7, 'Jul'], [8, 'Aug'], [9, 'Sep'], [10, 'Oct'], [11, 'Nov'], [12, 'Dec']
      ]
    },
    yaxis: {font: {color: '#ccc'}},
    grid: {hoverable: true, clickable: true, borderWidth: 0, color: '#ccc'},
    tooltip: true,
    tooltipOpts: {content: '%x.1 is %y.4', defaultTheme: false, shifts: {x: 0, y: 20}}
  };
  $scope.barParams = {
    bars: {show: true, barWidth: 0.6, fillColor: {colors: [{opacity: 0.5}, {opacity: 0.9}]}},
    xaxis: {font: {color: '#ccc'}},
    yaxis: {font: {color: '#ccc'}, min: -2, max: 2},
    grid: {hoverable: true, clickable: true, borderWidth: 0, color: '#ccc'},
    series: {shadowSize: 1},
    tooltip: true
  };
  $scope.orderBarParams = {
    bars: {show: true, fill: true, lineWidth: 1, order: 1, fillColor: {colors: [{opacity: 0.5}, {opacity: 0.9}]}},
    colors: ['#23b7e5', '#27c24c', '#7266ba'],
    series: {shadowSize: 1},
    xaxis: {font: {color: '#ccc'}},
    yaxis: {font: {color: '#ccc'}},
    grid: {hoverable: true, clickable: true, borderWidth: 0, color: '#ccc'},
    tooltip: true
  };
  $scope.d = [[1, 6.5], [2, 6.5], [3, 7], [4, 8], [5, 7.5], [6, 7], [7, 6.8], [8, 7], [9, 7.2], [10, 7], [11, 6.8], [12, 7]];
  $scope.d1_1 = [[10, 120], [20, 70], [30, 70], [40, 60]];
  $scope.d1_2 = [[10, 50], [20, 60], [30, 90], [40, 35]];
  $scope.d1_3 = [[10, 80], [20, 40], [30, 30], [40, 20]];
  $scope.d2 = [];

  for (var i = 0; i < 20; ++i) {
    $scope.d2.push([i, Math.sin(i)]);
  }


//动态数据 绘制说说发表折线图

  /*
  ** 计算日期之间相差的月份
   */
  function getYearAndMonth(start, end) {
    var starts = start.split('-');
    var ends = end.split('-');
    var staYear = parseInt(starts[0]);
    var staMon = parseInt(starts[1]);
    var endYear = parseInt(ends[0]);
    var endMon = parseInt(ends[1]);
    var i = 1;
    while (staYear <= endYear) {
      if (staYear === endYear) {
        while (staMon < endMon) {
          staMon++;
          $scope.ticks.push([++i, staYear + '-' + staMon]);
        }
        staYear++;
      } else {
        staMon++;
        if (staMon > 12) {
          staMon = 1;
          staYear++;
        }
        $scope.ticks.push([++i, staYear + '-' + staMon]);
      }
    }
    return $scope.ticks;
  }


  $scope.ticks = []; //折线图x轴描述
  $scope.myData = [];//折线图数据
  $scope.results = dynamic.data.result;//个人动态数据
  
  var tag = $scope.results.length - 1;//时间戳最后一天下标
  var endDate = $scope.results[tag].creationDate;
  
  $scope.ticks.push([1, new Date(endDate).getFullYear() + '-' + (new Date(endDate).getMonth() + 1)]);//x轴起点描述

  $scope.minDate = formatDate.getDate(endDate);//最早评论日期
  $scope.nowDate = formatDate.getDate(new Date().getTime());//当前日期
  $scope.ticks = getYearAndMonth($scope.minDate, $scope.nowDate);
  /*
  * 寻找每个月的动态量
   */
  for (var j = 0; j < $scope.ticks.length; j++) {
    var k = 0;
    $.each($scope.results, function (i, r) {
      if ((new Date(r.creationDate).getFullYear() + '-' + (new Date(r.creationDate).getMonth() + 1)) === $scope.ticks[j][1]) {
        k++;
      }
    });
    $scope.myData.push([j + 1, k]);
  }
  /*
  * 设置参数
   */
  $scope.splineDynamic = {
    colors: ['#7266ba'],
    series: {shadowSize: 3},
    xaxis: {
      font: {color: '#ccc'},
      position: 'bottom',
      ticks: $scope.ticks
    },
    yaxis: {font: {color: '#ccc'}},
    grid: {hoverable: true, clickable: true, borderWidth: 0, color: '#ccc'},
    tooltip: true,
    tooltipOpts: {content: '%x 的动态数量是 %y.0', defaultTheme: false, shifts: {x: 0, y: 10}}
  };

});
