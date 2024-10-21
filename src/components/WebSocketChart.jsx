import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const WebSocketChart = ({ symbol = "ethusdt", interval = "1m" }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const socketRef = useRef();

  useEffect(() => {
    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: { backgroundColor: "#f4f4f4", textColor: "#000" },
      priceScale: { borderColor: "#ccc" },
      timeScale: { borderColor: "#ccc" },
    });

    const candleSeries = chartRef.current.addCandlestickSeries();

    // Setup WebSocket
    const connectToWebSocket = () => {
      const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`;
      socketRef.current = new WebSocket(wsUrl);

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { t, o, h, l, c } = data.k;
        candleSeries.update({
          time: t / 1000,
          open: parseFloat(o),
          high: parseFloat(h),
          low: parseFloat(l),
          close: parseFloat(c),
        });
      };

      socketRef.current.onclose = () => console.log("WebSocket closed.");
    };

    connectToWebSocket();

    return () => {
      socketRef.current.close();
      chartRef.current.remove();
    };
  }, [symbol, interval]);

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }} />
  );
};

export default WebSocketChart;
