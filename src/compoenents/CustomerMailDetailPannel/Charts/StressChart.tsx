import React, { useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

interface StressChartProps {
    data: { projectCompletedDate: string; stressPct: number }[];
}

const StressChart: React.FC<StressChartProps> = ({ data }) => {
    useLayoutEffect(() => {
        const chart = am4core.create('stressChartDiv', am4charts.XYChart);
        chart.data = data.map(item => ({
            date: new Date(item.projectCompletedDate),
            stress: item.stressPct
        }));

        const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.title.text = "Date";

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Stress (%)";

        const series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = 'stress';
        series.dataFields.dateX = 'date';
        series.strokeWidth = 2;
        series.tooltipText = "{valueY}%";

        chart.cursor = new am4charts.XYCursor();
        chart.scrollbarX = new am4core.Scrollbar();

        return () => {
            chart.dispose();
        };
    }, [data]);

    return <div id="stressChartDiv" style={{ width: "100%", height: "500px" }} />;
};

export default StressChart;
