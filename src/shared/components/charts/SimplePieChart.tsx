import {
  Pie,
  PieChart,
  type PieSectorShapeProps,
  Sector,
  Tooltip,
  type TooltipIndex
} from 'recharts';

const data = [
  { name: 'Ventas', x: 800 },
  { name: 'Suscripciones', x: 450 },
  { name: 'Publicidad', x: 300 },
  { name: 'Otros', x: 150 }
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieGradient = (props: PieSectorShapeProps) => {
  return (
    <>
      <defs>
        <radialGradient
          id={`fillGradient${props.index}`}
          cx={props.cx}
          cy={props.cy}
          r={props.outerRadius}
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor={COLORS[props.index % COLORS.length]}
            stopOpacity={0}
          />
          <stop
            offset="100%"
            stopColor={COLORS[props.index % COLORS.length]}
            stopOpacity={0.8}
          />
        </radialGradient>
        <radialGradient
          id={`borderGradient${props.index}`}
          cx={(typeof props.width === 'number' ? props.width : 0) / 2}
          cy={(typeof props.height === 'number' ? props.height : 0) / 2}
        >
          <stop
            offset="0%"
            stopColor={COLORS[props.index % COLORS.length]}
            stopOpacity={0}
          />
          <stop
            offset="100%"
            stopColor={COLORS[props.index % COLORS.length]}
            stopOpacity={0.8}
          />
        </radialGradient>
        <clipPath id={`clipPath${props.index}`}>
          <Sector {...props} />
        </clipPath>
      </defs>
      <Sector
        {...props}
        clipPath={`url(#clipPath${props.index})`}
        fill={`url(#fillGradient${props.index})`}
        stroke={`url(#borderGradient${props.index})`}
        strokeWidth={props.isActive ? '100%' : 0}
      />
    </>
  );
};

export default function SimplePieChart({
  isAnimationActive = true,
  defaultIndex
}: {
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) {
  return (
    <PieChart
      style={{
        width: '100%',
        maxWidth: '500px',
        maxHeight: '80vh',
        aspectRatio: 1
      }}
      responsive
    >
      <Pie
        data={data}
        dataKey="x"
        isAnimationActive={isAnimationActive}
        shape={PieGradient}
        innerRadius="20%"
      />
      <Tooltip defaultIndex={defaultIndex} />
    </PieChart>
  );
}
