import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// 注册Chart.js所需的组件
ChartJS.register(ArcElement, Tooltip, Legend);

const SleepQualityGauge = ({ overallQualityMean, thresholdLow, thresholdHigh, category }) => {
  // 定义仪表盘的数据
  const data = {
    datasets: [
      {
        // 定义三个扇形区域的数据
        data: [thresholdLow, thresholdHigh - thresholdLow, 10 - thresholdHigh],
        // 定义三个扇形区域的背景颜色（带透明度）
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',  // 红色 (Bad)
          'rgba(255, 206, 86, 0.6)',  // 黄色 (Medium)
          'rgba(75, 192, 192, 0.6)',  // 蓝绿色 (Good)
        ],
        // 定义三个扇形区域的边框颜色
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)', 
        ],
        borderWidth: 1,  // 边框宽度
      },
    ],
  };

  // 定义仪表盘的选项
  const options = {
    circumference: 240,  // 圆环的总角度（度数）
    rotation: -120,  // 起始角度（度数）
    cutout: '80%',  // 中心孔的大小
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,  // 禁用悬停提示
      },
      legend: {
        display: false,  // 不显示图例
      },
    },
  };

  // 定义自定义绘制函数
  const gaugeText = {
    id: 'gaugeText',
    afterDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, chartArea: { bottom, left, right, width, height } } = chart;

      ctx.save();
      const xCenter = width / 2;
      const yCenter = height * 0.75;
      const radius = Math.min(width, height) / 2;

      // 定义起始和结束角度（弧度）
      const startAngle = Math.PI * 7/ 6; // 210度
      const endAngle = Math.PI * 11 / 6; // 330度
      const totalAngle = endAngle - startAngle;

      // 设置文本样式
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      
      // 绘制最小值和最大值
      ctx.fillText('0', left + 10, bottom);
      ctx.fillText('10', right - 10, bottom);

      // 定义绘制阈值的函数
      const drawThreshold = (value, label) => {
        const angle = startAngle + (value / 10) * totalAngle;
        const x = xCenter + radius * 0.9 * Math.cos(angle);
        const y = yCenter + radius * 0.9 * Math.sin(angle);
        ctx.fillText(label, x, y);
      };

      // 绘制低阈值和高阈值
      drawThreshold(thresholdLow, thresholdLow.toFixed(1));
      drawThreshold(thresholdHigh, thresholdHigh.toFixed(1));

      // 计算并绘制指针
      const meanAngle = startAngle + (overallQualityMean / 10) * totalAngle;
      const pointerLength = radius * 0.8;
      const pointerWidth = 4;
      const pointerX = xCenter + pointerLength * Math.cos(meanAngle);
      const pointerY = yCenter + pointerLength * Math.sin(meanAngle);

      // 绘制指针线
      ctx.beginPath();
      ctx.moveTo(xCenter, yCenter);
      ctx.lineTo(pointerX, pointerY);
      ctx.lineWidth = pointerWidth;
      ctx.strokeStyle = '#333';
      ctx.stroke();

      // 绘制指针的圆形底座
      ctx.beginPath();
      ctx.arc(xCenter, yCenter, pointerWidth * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();

      ctx.restore();
    }
  };

  // 返回Doughnut组件
  return (
    <div style={{ width: '450px', height: '300px' }}>
      <Doughnut data={data} options={options} plugins={[gaugeText]} />
    </div>
  );
};

export default SleepQualityGauge;