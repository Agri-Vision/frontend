import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export const createChart = (data: any[], chartId: string) => {
  let chart = am4core.create(chartId, am4charts.XYChart);
  chart.data = data;

  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.title.text = "Date";
  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.title.text = "Values";

  let series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value"; 
  series.dataFields.dateX = "date"; 
  series.tooltipText = "{value}";

  chart.cursor = new am4charts.XYCursor();


  let scrollbarX = new am4charts.XYChartScrollbar();
  scrollbarX.series.push(series); 
  chart.scrollbarX = scrollbarX;

  return chart;
};
