import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import * as echarts from 'echarts';

const Monitor = () => {
  const [cpuUsage, setCpuUsage] = useState("0");
  const [memoryUsage, setMemoryUsage] = useState("0");
  const socketRef = useRef(null); // Socket引用
  const chartCpuRef = useRef(null);
  const chartMemoryRef = useRef(null);

  useEffect(() => {
    // socketRef.current = io("http://172.190.79.138:8000", {path:'/ws/socket.io', autoConnect: true}); // 替换为FastAPI服务器的地址
    socketRef.current = io("http://letsthink.top", {path:'/ws/socket.io', autoConnect: true});
    // socketRef.current = io("http://172.190.79.138:8000")
    chartCpuRef.current = echarts.init(chartCpuRef.current);
    chartMemoryRef.current = echarts.init(chartMemoryRef.current);

    socketRef.current.on("usage", (data) => { // 监听 "cpu_usage" 事件
      // console.log(data);
      setCpuUsage(data['cpu_percent']);
      setMemoryUsage(data['memory_percent']);
    });

    socketRef.current.on("connect", () => {
      socketRef.current.emit("start_monitor");
    });

    return () => {
      socketRef.current.emit("stop_monitor");
      socketRef.current.disconnect(); // 在组件卸载时关闭Socket连接
    };
  }, []);

  const getOption = (usage, label) => {
    return {
      dark: true,
      backgroundColor: '#001122',
      series: [
        {
          type: 'gauge',
          progress: {
            show: false,
            width: 5,
            itemStyle: {
              color: {
                type: 'radial',
                global: true,
                colorStops: [
                  {
                    offset: 0,
                    color: 'transparent',
                  },
                  {
                    offset: 0.7,
                    color: 'transparent',
                  },
                  {
                    offset: 0.95,
                    color: 'rgba(150, 200, 255, 0.5)',
                  },
                  {
                    offset: 0.98,
                    color: 'rgba(230, 250, 255, 0.9)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(255,255,255,1)',
                  },
                ],
              },
            },
          },
          axisLine: {
            lineStyle: {
              width: 2,
              color: [
                [0.8, '#fff'],
                [1, 'red'],
              ],
            },
          },
          axisTick: {
            lineStyle: {
              color: '#fff',
            },
          },
          splitLine: {
            length: 15,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          axisLabel: {
            color: '#fff',
            fontSize: 20,
          },
          anchor: {
            show: true,
            size: 60,
            showAbove: true,
            itemStyle: {
              color: '#001122',
              opacity: 0.9,
              borderColor: 'rgba(255,255,255,0.8)',
              borderWidth: 1,
              shadowBlur: 30,
              shadowColor: 'rgba(255, 255, 255, 0.5)',
            },
          },
          pointer: {
            offsetCenter: [0, '20%'],
            icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
            length: '110%',
            itemStyle: {
              color: 'rgba(255,255,255,0.9)',
            },
          },
          title: {
            show: false,
          },
          detail: {
              valueAnimation: true,
              offsetCenter: [0, '50%'],
              rich: {
                  unit: {
                      lineHeight: 80,
                      color: '#fff',
                      fontSize: 30,
                  },
              },
              fontSize: 50,
              color: '#fff',
          },
          data: [
            {
              value: usage,
              name:label,
            },
          ],
        },
      ],
    };
  };

  useEffect(() => {
    const cpuOption = getOption(cpuUsage, "CPU");
    chartCpuRef.current.setOption(cpuOption);

    const memoryOption = getOption(memoryUsage, "Memory");
    chartMemoryRef.current.setOption(memoryOption);
  }, [cpuUsage, memoryUsage]);

  return (
    <div className="child1-content" >
       <p>服务器系统监控</p>
       <p>服务器资源情况: 1cpu 1线程, 内存1G</p>
      <div style={{ display: 'flex' , gap: '20px'}}>
        <p style={{ width: '45%' }}>CPU Usage: {cpuUsage}</p>
        <p>Memory Usage: {memoryUsage}</p>
      </div>
      <div className="chart-container" style={{ display: 'flex' , gap: '20px'}}>
        <div className="cpu-monitor" style={{ width: '45%', height: '400px' }} ref={chartCpuRef} />
        <div className="memory-monitor" style={{ width: '45%', height: '400px' }} ref={chartMemoryRef} />
      </div>
    </div>  
  );
};

export default Monitor;