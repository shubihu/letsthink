import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import graphData from '../data.json'; // 确保路径正确
import '../css/kg.css';

const KnowledgeGraph = () => {
  const chartDom = useRef(null);
  const myChart = useRef(null);
  const [searchResults, setSearchResults] = useState(graphData); // 初始化状态为完整数据

  const search = (event) => {
    const name = event.target.value.toLowerCase(); // 获取用户输入的值
    if (!name.trim()) {
      setSearchResults(graphData); // 如果没有输入，则显示完整的数据集
      return;
    }
    
    // 获取匹配名称节点
    const filteredNodes = graphData.nodes.filter(node => node.name.toLowerCase().includes(name));
    const nodeIds = new Set(filteredNodes.map(node => node.id));
  
    // 获取连接匹配节点的链接
    const filteredLinks = graphData.links.filter(
      link => nodeIds.has(link.source) || nodeIds.has(link.target)
    );
    const linkedNodeIds = new Set(filteredLinks.flatMap(link => [link.source, link.target]));
    
    // 获取所有与这些链接相连的节点
    const nodesToShow = graphData.nodes.filter(node => linkedNodeIds.has(node.id));
  
    // 更新仅包含连接节点的数据集
    const filteredData = {
      nodes: nodesToShow,
      links: filteredLinks,
      categories: graphData.categories
    };
    
    setSearchResults(filteredData); // 设置过滤后结果的状态
  };

  useEffect(() => {
    myChart.current = echarts.init(chartDom.current);

    const option = {
      title: {
        text: 'Knowledge Graph',
        subtext: 'Default layout',
        top: 'bottom',
        left: 'right'
      },
      tooltip: {},
      legend: [
        {
          data: searchResults.categories.map(function (a) {
            return a.name;
          })
        }
      ],
      series: [
        {
          name: 'Knowledge Graph',
          type: 'graph',
          layout: 'none',
          draggable: true,
          data: searchResults.nodes, // 使用筛选后的节点
          links: searchResults.links, // 可以选择使用筛选后的连接
          categories: searchResults.categories,
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
  }, [searchResults]); // 使用 searchResults 作为依赖项

  return (
    <>
      <div className="search-group">
        <svg className="search-icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
        <input placeholder="Search" type="search" className="input" onChange={search} />
      </div>
      <div ref={chartDom} style={{ width: '100%', height: '90%', backgroundColor: 'white' }} />
    </>
  );
};

export default KnowledgeGraph;

