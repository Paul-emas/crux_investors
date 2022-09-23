import { MarketData } from '@/utils/typings'
import TrendArrow from '@components/Svgs/TrendArrow'
import classNames from 'classnames'
import React, { useCallback, useState } from 'react'

import GraphLine from './GraphLine'

export const avgLine = (dataKey = 'closePrice'): any => ({
  activeDot: false,
  connectNulls: true,
  dataKey,
  dot: false,
  stroke: '#6D6D6D',
  strokeDasharray: '3 6',
  strokeWidth: 1,
  type: 'monotone',
})

type GraphReportProps = {
  data: MarketData
  companySymbol?: string
}

const GraphReport: React.FC<GraphReportProps> = ({ data, companySymbol }) => {
  const [graphLoading, setGraphLoading] = useState(true)
  const [trend, setTrend] = useState<'up' | 'down'>('up')
  const [diff, setDiff] = useState<number>(0)
  const [diffP, setDiffP] = useState<number>(0)
  const [lastPrice, setLastPrice] = useState<number>(0)

  const onGraphProcess = useCallback(
    (t, d, dp, lp) => {
      setTrend(t)
      setDiff(d)
      setDiffP(dp)
      setLastPrice(lp)
      setGraphLoading(false)
    },
    [setGraphLoading, setTrend, setDiff, setDiffP, setLastPrice]
  )

  return (
    <div className="bg-neutral-100 p-4 rounded-xl">
      <div
        className={classNames('transition-opacity', {
          'opacity-0': graphLoading,
          'opacity-100': !graphLoading,
        })}
      >
        <div className="flex items-center justify-between pb-6">
          <div className="text-md text-neutral-035">{companySymbol}</div>
          <div className="flex items-center justify-end">
            <div className="text-xsm text-neutral-035 px-4">{lastPrice}</div>
            <div
              className={classNames('flex text-xsm items-center', {
                'text-colour-g2': trend === 'up',
                'text-colour-r2': trend === 'down',
              })}
            >
              <div className="text-xsm text-neutral-055">1 Year</div>
              <TrendArrow dir={trend} />
              <div>
                ${diff} ({diffP}%)
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <GraphLine data={data} onProcess={onGraphProcess} />
        </div>
      </div>
      {/* Todo: Hide for now since there is no data for props */}
      {/* <div className="flex justify-between pt-12">
        <Prop name="Upcoming Earnings" value="Apr 06" />
        <Prop name="EPS" value="0.5" />
        <Prop name="Market Cap" value="100M" />
        <Prop name="P/E" value="10" />
      </div> */}
    </div>
  )
}

export default GraphReport
