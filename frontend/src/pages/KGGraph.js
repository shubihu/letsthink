import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import graph from '../data.json'; // 确保路径正确

const KnowledgeGraph = () => {
  const chartDom = useRef(null);
  const myChart = useRef(null);

  useEffect(() => {
    myChart.current = echarts.init(chartDom.current);
    
    // 直接使用导入的 graph 数据，无需 showLoading 和 hideLoading
    // graph.nodes.forEach(function (node) {
    //   node.symbolSize = 5;
    // });

    const option = {
      title: {
        text: 'Knowledge Graph',
        subtext: 'Default layout',
        top: 'bottom',
        left: 'right'
      },
      tooltip: {},
      legend: [{
        data: graph.categories.map(function (a) {
          return a.name;
        })
      }],
      series: [
      //   {
      //   name: 'Knowledge Graph',
      //   type: 'graph',
      //   layout: 'force',
      //   draggable: true,
      //   data: graph.nodes,
      //   links: graph.links,
      //   categories: graph.categories,
      //   roam: true,
      //   label: {
      //     position: 'right'
      //   },
      //   force: {
      //     repulsion: 100
      //   }
      // }
      {
        name: 'Les Miserables',
        type: 'graph',
        layout: 'none',
        draggable: true,
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        labelLayout: {
          hideOverlap: true
        },
        scaleLimit: {
          min: 0.4,
          max: 2
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        }
      }
    ]
    };
    
    myChart.current.setOption(option);

    // 在组件卸载时清理图表实例
    return () => {
      if (myChart.current) {
        myChart.current.dispose();
      }
    };
  }, []); // 空依赖数组意味着 effect 只在组件挂载时执行一次

  return <div ref={chartDom} style={{ width: '100%', height: '100%' , backgroundColor: 'white'}} />;
};

export default KnowledgeGraph;
