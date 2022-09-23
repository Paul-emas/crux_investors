import { MarketData } from '@/utils/typings'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

type CustomizedDotProps = {
  cx?: number
  payload?: any
}

const CustomizedDot: React.FC<CustomizedDotProps> = (props) => {
  const { cx, payload } = props

  const date = dayjs(payload.date * 1000)

  let quarterText = ''

  switch (date.month()) {
    case 1:
      quarterText = 'Q1'
      break

    case 4:
      quarterText = 'Q2'
      break

    case 7:
      quarterText = 'Q3'
      break

    case 10:
      quarterText = 'Q4'
      break

    default:
      break
  }

  if (!quarterText) {
    return null
  }
  return (
    <g transform={`translate(${cx},${42})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#E2E2E2"
        fontSize="0.8125rem"
        fontFamily="'SF Pro Text','sans-serif'"
      >
        {quarterText}
      </text>
    </g>
  )
}

export const avgLine = (dataKey = 'closePrice'): any => ({
  activeDot: false,
  connectNulls: true,
  dataKey,
  dot: false,
  stroke: '#6D6D6D',
  strokeDasharray: '3 6',
  strokeWidth: 0,
  type: 'monotone',
})

type GraphLineProps = {
  data: MarketData
  onProcess: (trend: 'up' | 'down', diff: number, diffPercend: number, lastPrice: number) => void
}

const GraphLine: React.FC<GraphLineProps> = ({ data, onProcess }) => {
  const [graphData, setGraphData] = useState({ chart: [], min: 0, max: 9, trend: 'up' })
  useEffect(() => {
    try {
      const values = data?.values
        ?.map((v) => ({
          close: parseFloat(v.close),
          open: parseFloat(v.open),
          date: dayjs(v.datetime).unix(),
        }))
        .sort((a, b) => a.date - b.date)

      const max =
        values.reduce(
          (highest, current) => Math.max(highest, current.close),
          values[0]?.close || 0
        ) * 1.002

      const min =
        values.reduce((lowest, current) => Math.min(lowest, current.close), values[0]?.close || 0) *
        0.996

      const lastPrice = values[values.length - 1].close
      const diff = Math.abs(lastPrice - values[0].close)
      const diffPr = (diff / values[0].close) * 100
      const trend = lastPrice >= values[0].close ? 'up' : 'down'
      setGraphData({
        min,
        max,
        chart: values.map((v) => ({ ...v, closePrice: values[0]?.close })),
        trend,
      })
      onProcess(
        trend,
        Math.round(diff * 100) / 100,
        Math.round(diffPr * 100) / 100,
        Math.round(lastPrice * 100) / 100
      )
    } catch (e) {
      console.error('Error mapping graph')
      console.error(e)
    }
  }, [data, setGraphData, onProcess])

  return (
    <div className="sm:h-24 mt-5 md:mt-0  md:h-16 w-full border-b border-neutral-500">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={graphData.chart} margin={{ top: 5, right: 5, bottom: 16, left: 5 }}>
          <Line {...avgLine()} dot={<CustomizedDot />} />
          <Line
            stroke={graphData.trend === 'up' ? '#06AB49' : '#D0241C'}
            dot={false}
            type="linear"
            dataKey="close"
            strokeWidth={2}
          />
          <XAxis hide dataKey="date" />
          <YAxis hide domain={[graphData.min, graphData.max]} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraphLine
