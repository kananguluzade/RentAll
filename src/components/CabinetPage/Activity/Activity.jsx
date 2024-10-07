import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const Activity = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: "axis",
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        formatter: "{a} <br/>{b}: {c}",
      },
      xAxis: {
        type: "category",
        data: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        axisLabel: {
          color: "#999",
        },
        axisLine: {
          lineStyle: {
            color: "#ccc",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          color: "#999",
        },
        axisLine: {
          lineStyle: {
            color: "#ccc",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#eee",
          },
        },
      },
      series: [
        {
          name: "Activity",
          type: "line",
          data: [
            8200, 9320, 9010, 9340, 12900, 13300, 13200, 12000, 11500, 14000,
            15500, 14000,
          ],
          smooth: true,
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(255, 255, 255, 0.8)" },
                { offset: 1, color: "rgba(154, 207, 247, 0.6)" },
              ],
            },
          },
          itemStyle: {
            color: "#4f8ef7",
          },
        },
      ],
    };

    chartInstance.setOption(option);

    const handleResize = () => {
      chartInstance.resize();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "564px",
      }}
    />
  );
};

export default Activity;
