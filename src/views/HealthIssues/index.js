import { Select, Button, Dropdown, Space, message, Tabs } from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './index.css';
import React, { useState } from 'react';

export default function Component() {
  const [activeTab, setActiveTab] = useState('1');
  const [filters, setFilters] = useState({
    ageGroup: null,
    gender: null,
    birthRegion: null,
  });
  const [data, setData] = useState([]);

  const ageGroups = [
    "0-4 years", "5-9 years", "10-14 years", "15-19 years", "20-24 years", 
    "25-29 years", "30-34 years", "35-39 years", "40-44 years", "45-49 years", 
    "50-54 years", "55-59 years", "60-64 years", "65-69 years", "70-74 years", 
    "75-79 years", "80-84 years", "85 years and over"
  ];

  const genders = ["Male", "Female"];

  const birthRegions = [
    "Australia", "Oceania", "North-West Europe", "Southern and Eastern Europe", 
    "Africa and the Middle East", "South-East Asia", "North-East Asia", 
    "Southern and Central Asia", "Americas", "Sub-Saharan Africa", "Not stated"
  ];

  const fakeData = [
    { disease: "Diabetes", prevalence: 40 },
    { disease: "Hypertension", prevalence: 30 },
    { disease: "Asthma", prevalence: 20 },
    { disease: "Depression", prevalence: 10 },
    { disease: "Anxiety", prevalence: 25 },
    { disease: "Obesity", prevalence: 35 },
  ];

  const handleSearch = () => {
    if (filters.birthRegion) {
      // 模拟数据过滤逻辑
      const filteredData = fakeData.filter(item => item.disease !== "Anxiety"); // 示例过滤逻辑
      setData(filteredData);
    } else {
      // 模拟数据直接返回
      setData(fakeData);
    }
    console.log('Simulated data:', data);
  };

  const handleSort = (key) => {
    let sortedData = [];
    if (key === '1') {
      // Sort by number high to low
      sortedData = [...data].sort((a, b) => b.prevalence - a.prevalence);
    } else if (key === '2') {
      // Sort by number low to high
      sortedData = [...data].sort((a, b) => a.prevalence - b.prevalence);
    }
    setData(sortedData);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleFilterChange = (value, type) => {
    setFilters({
      ...filters,
      [type]: value,
    });
  };

  const menuProps = {
    items: [
      {
        label: 'Sort by number high to low',
        key: '1',
        icon: <UserOutlined />,
        onClick: () => handleSort('1'),
      },
      {
        label: 'Sort by number low to high',
        key: '2',
        icon: <UserOutlined />,
        onClick: () => handleSort('2'),
      },
    ],
  };

  return (
    <div className="space-y-8 p-8">
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          { label: 'Country', key: '1' },
          { label: 'State', key: '2' },
        ]}
        onTabClick={handleTabChange}
      />
      {activeTab === '1' && (
        <div className="space-y-10 flex flex-col items-center">
          <h2 className="text-xl font-bold text-center text-[#0F296D]">Prevalence of different diseases among Australian migrants</h2>
          <div className="flex items-center space-x-2">
            <Select 
              className="w-48" 
              placeholder="Age Group" 
              onChange={(value) => handleFilterChange(value, 'ageGroup')}
            >
              {ageGroups.map((age, index) => (
                <Select.Option key={index} value={age}>{age}</Select.Option>
              ))}
            </Select>

            <Select 
              className="w-48" 
              placeholder="Gender" 
              onChange={(value) => handleFilterChange(value, 'gender')}
            >
              {genders.map((gender, index) => (
                <Select.Option key={index} value={gender}>{gender}</Select.Option>
              ))}
            </Select>

            <Select 
              className="w-48" 
              placeholder="Place of Birth" 
              onChange={(value) => handleFilterChange(value, 'birthRegion')}
            >
              {birthRegions.map((region, index) => (
                <Select.Option key={index} value={region}>{region}</Select.Option>
              ))}
            </Select>

            <Button className="bg-[#00BD90] text-white" onClick={handleSearch}>Search</Button>

            <Dropdown menu={menuProps} className="w-24 bg-[#00BD90] text-white">
              <Button>
                <Space>
                  Sort
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>

          {/* 渲染模拟数据 */}
          <div className="space-y-4 w-[40vw]">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-32">{item.disease}</span>
                <div className="flex-1 h-4 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${item.prevalence}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
