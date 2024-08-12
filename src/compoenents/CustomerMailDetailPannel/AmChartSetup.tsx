import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export const createChart = (data: any[], chartId: string) => {
  let chart = am4core.create(chartId, am4charts.XYChart);
  chart.data = data;

  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  let series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value"; // Dummy data uses "value" for the Y-axis
  series.dataFields.dateX = "date"; // Dummy data uses "date" for the X-axis
  series.tooltipText = "{value}";

  chart.cursor = new am4charts.XYCursor();

  // Set up the scrollbar
  let scrollbarX = new am4charts.XYChartScrollbar();
  scrollbarX.series.push(series); // Link the series to the scrollbar
  chart.scrollbarX = scrollbarX;

  return chart;
};
