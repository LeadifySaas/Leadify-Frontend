import { css } from '../../../styled-system/css';
import { stack, grid, hstack, center } from '../../../styled-system/patterns';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  FileText,
  BarChart3,
  ListChecks
} from 'lucide-react';

export default function HomePage() {
  const days = ['Lune', 'Mart', 'Miér', 'Juev', 'Vier', 'Sáb', 'Dom'];

  return (
    <div className={stack({ gap: '8', p: '2' })}>
      {/* Header */}
      <div className={hstack({ justifyContent: 'space-between', alignItems: 'center' })}>
        <div className={stack({ gap: '1' })}>
          <h1 className={css({ fontSize: '3xl', fontWeight: '800', color: '#1A365D', letterSpacing: 'tight' })}>
            Dashboard Operativo
          </h1>
          <p className={css({ color: 'gray.500', fontSize: 'md' })}>
            Resumen de actividad | <strong>Leadify v1.0</strong>
          </p>
        </div>
        <div className={css({
          px: '4', py: '2', bgColor: 'white', border: '1px solid', borderColor: 'gray.200',
          borderRadius: 'xl', fontSize: 'xs', fontWeight: 'bold', boxShadow: 'sm'
        })}>
          <span className={css({ color: 'green.500', mr: '2' })}>●</span> EN VIVO
        </div>
      </div>

      {/* KPIs */}
      <div className={grid({ columns: { base: 1, md: 2, lg: 4 }, gap: '6' })}>
        <StatCard title="Remitos Totales" value="8,542" trend="+12%" icon={<FileText size={20} />} color="#3182CE" />
        <StatCard title="Alertas de Red" value="03" trend="Estable" icon={<AlertTriangle size={20} />} color="#E53E3E" />
        <StatCard title="Sedes Activas" value="12" trend="100%" icon={<CheckCircle2 size={20} />} color="#38A169" />
        <StatCard title="Tiempo Promedio" value="12m" trend="-5%" icon={<Clock size={20} />} color="#805AD5" />
      </div>

      <div className={grid({ columns: { base: 1, lg: 12 }, gap: '6' })}>

        {/* Gráfico 1: Barras Corregido */}
        <div className={css({
          lg: { gridColumn: 'span 5' }, bgColor: 'white', p: '6', borderRadius: '2xl',
          boxShadow: 'sm', border: '1px solid', borderColor: 'gray.100'
        })}>
          <div className={hstack({ justifyContent: 'space-between', mb: '6' })}>
            <h3 className={hstack({ gap: '2', fontWeight: 'bold' })}><BarChart3 size={18} /> Actividad Semanal</h3>
          </div>
          <div className={hstack({ height: '220px', alignItems: 'flex-end', gap: '3', px: '2' })}>
            {[45, 60, 35, 90, 70, 55, 80].map((h, i) => (
              <div key={i} className={stack({ flex: 1, gap: '2', alignItems: 'center' })}>
                <div className={css({
                  width: '100%', bgColor: 'blue.50', borderRadius: 't-lg', position: 'relative', overflow: 'hidden', height: '180px'
                })}>
                  <div className={css({
                    position: 'absolute', bottom: 0, width: '100%', bgColor: 'blue.500', borderRadius: 't-lg'
                  })} style={{ height: `${h}%` }} />
                </div>
                <span className={css({ fontSize: '10px', color: 'gray.400', fontWeight: '700', textTransform: 'uppercase' })}>
                  {days[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico 2: Metas */}
        <div className={css({
          lg: { gridColumn: 'span 3' }, bgColor: 'white', p: '6', borderRadius: '2xl',
          boxShadow: 'sm', border: '1px solid', borderColor: 'gray.100'
        })}>
          <h3 className={hstack({ gap: '2', fontWeight: 'bold', mb: '6' })}><ListChecks size={18} /> Metas por Sede</h3>
          <div className={stack({ gap: '5' })}>
            <ProgressItem label="Sede Central" value={85} color="blue.500" />
            <ProgressItem label="Sede Norte" value={40} color="orange.500" />
            <ProgressItem label="Sede Sur" value={95} color="green.500" />
            <ProgressItem label="Sede Este" value={65} color="purple.500" />
          </div>
        </div>

        {/* Actividad Reciente Mejorada */}
        <div className={css({
          lg: { gridColumn: 'span 4' }, bgColor: 'white', p: '6', borderRadius: '2xl',
          boxShadow: 'sm', border: '1px solid', borderColor: 'gray.100'
        })}>
          <h3 className={css({ fontWeight: 'bold', fontSize: 'lg', mb: '6', color: '#1A365D' })}>Últimos Movimientos</h3>
          <div className={stack({ gap: '1' })}>
            <ActivityItem user="Enzo" action="creó un nuevo remito" detail="RE-2026-001" time="hace 5 min" />
            <ActivityItem user="Fabricio" action="autorizó rol" detail="Editor" time="hace 12 min" />
            <ActivityItem user="Sistema" action="alerta de sensor" detail="Sede Norte" time="hace 45 min" isAlert />
            <ActivityItem user="Fausto" action="exportó PDF" detail="Reporte Marzo" time="hace 1 hora" />
            <ActivityItem user="Jose" action="actualizó clave" detail="Seguridad" time="hace 2 horas" />
          </div>
          <button className={css({
            width: '100%', mt: '6', p: '3', border: '1px solid', borderColor: 'blue.100',
            color: 'blue.600', borderRadius: 'xl', fontSize: 'xs', fontWeight: '800',
            cursor: 'pointer', _hover: { bgColor: 'blue.50', borderColor: 'blue.200' }, transition: '0.2s'
          })}>
            AUDITAR ACTIVIDAD COMPLETA
          </button>
        </div>

      </div>
    </div>
  );
}

// --- SUBCOMPONENTES ---

function ProgressItem({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className={stack({ gap: '1.5' })}>
      <div className={hstack({ justifyContent: 'space-between' })}>
        <span className={css({ fontSize: 'xs', fontWeight: '700', color: 'gray.700' })}>{label}</span>
        <span className={css({ fontSize: 'xs', fontWeight: '800', color: color })}>{value}%</span>
      </div>
      <div className={css({ width: '100%', height: '6px', bgColor: 'gray.100', borderRadius: 'full' })}>
        <div className={css({ height: '100%', borderRadius: 'full' })} style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon, color }: any) {
  return (
    <div className={css({
      bgColor: 'white', p: '6', borderRadius: '2xl', boxShadow: 'sm', border: '1px solid', borderColor: 'gray.100'
    })}>
      <div className={hstack({ justifyContent: 'space-between', mb: '4' })}>
        <div className={center({ p: '3', borderRadius: 'xl', bgColor: 'gray.50', color: color })}>{icon}</div>
        <div className={css({
          fontSize: 'xs', fontWeight: '800', px: '2', py: '1', borderRadius: 'md',
          bgColor: trend.includes('+') ? 'green.50' : 'gray.50',
          color: trend.includes('+') ? 'green.600' : 'gray.600'
        })}>{trend}</div>
      </div>
      <p className={css({ fontSize: 'xs', fontWeight: '700', color: 'gray.400', textTransform: 'uppercase', letterSpacing: 'wider' })}>{title}</p>
      <h2 className={css({ fontSize: '3xl', fontWeight: '800', color: '#1A365D', mt: '1' })}>{value}</h2>
    </div>
  );
}

function ActivityItem({ user, action, detail, time, isAlert }: any) {
  return (
    <div className={hstack({
      gap: '4', p: '3', borderRadius: 'xl', transition: '0.2s',
      _hover: { bgColor: 'gray.50', transform: 'translateX(4px)' }
    })}>
      <div className={center({
        width: '40px', height: '40px', borderRadius: 'full', flexShrink: 0,
        bgColor: isAlert ? 'red.50' : 'blue.50',
        color: isAlert ? 'red.600' : 'blue.600',
        fontSize: 'sm', fontWeight: '800'
      })}>
        {user.charAt(0)}
      </div>
      <div className={stack({ gap: '0.5', flex: 1 })}>
        <div className={hstack({ justifyContent: 'space-between' })}>
          <p className={css({ fontSize: 'sm', color: '#2D3748', fontWeight: '500' })}>
            <strong className={css({ fontWeight: '800', color: '#1A365D' })}>{user}</strong> {action}
          </p>
          <span className={css({ fontSize: '10px', color: 'gray.400', fontWeight: '600' })}>{time}</span>
        </div>
        <p className={css({ fontSize: 'xs', color: isAlert ? 'red.500' : 'blue.500', fontWeight: '700' })}>
          {detail}
        </p>
      </div>
    </div>
  );
}