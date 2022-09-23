import Cons from '@components/Svgs/Cons'
import Pros from '@components/Svgs/Pros'
import React from 'react'

const ConsPros: React.FC<{ type: 'pros' | 'cons'; list: string[] }> = ({
  type = 'pros',
  list = [],
}) => {
  return (
    <div className="bg-neutral-100 p-4 my-2 rounded-xl">
      <div className="text-neutral-055 text-xsm">
        {type === 'pros' ? 'Why it’s a good investment' : 'Keep an eye on'}
      </div>
      <div className="pt-4">
        {(list || []).map((item, idx) => (
          <div key={idx} className="flex mb-3 last:mb-0">
            <div className="">{type === 'pros' ? <Pros /> : <Cons />}</div>
            <div className="pl-3 font-light text-neutral-035 text-base">{item}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConsPros
