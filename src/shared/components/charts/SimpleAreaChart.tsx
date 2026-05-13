import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
// #region Sample data
const data = [
  {
    name: ' A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: ' B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: ' C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: ' D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: ' E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: ' F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: ' G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

// #endregion
const SimpleAreaChart = () => {
  return (
    <AreaChart
      style={{
        width: '100%',
        maxHeight: '400px',
        aspectRatio: 1.618
      }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0
      }}
      onContextMenu={(_, e) => e.preventDefault()}
    >
      <XAxis dataKey="name" niceTicks="snap125" />
      <YAxis width="auto" niceTicks="snap125" />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
};

export default SimpleAreaChart;
