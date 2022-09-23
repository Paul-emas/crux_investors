import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Button from '../Button'
import Modal from '../Modal'

type SwitchToAnnualProps = { periodEnd?: string; open?: boolean; setOpen: (value) => void }

const SwitchToAnnual: React.FC<SwitchToAnnualProps> = ({ periodEnd, open, setOpen }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  async function handleCancelSubcription(): Promise<void> {
    setIsLoading(true)
    const rs = await fetch('/api/crux/user/subscription', {
      method: 'PUT',
      body: JSON.stringify({ action: 'switch_annual' }),
    })
    if (rs.status !== 200) {
      setIsLoading(false)
      // Todo: Add custom alert
      alert((await rs.json()).message)
    } else {
      setIsLoading(false)
      setOpen(false)
      router.reload()
    }
  }

  return (
    <Modal title="Switch to annual subscription" open={open} setOpen={setOpen}>
      <p className="text-base text-neutral-1000">$299/yr. Cancel at any time.</p>
      <p>
        Your new billing cycle will start at the end of your current billing period on {periodEnd}
      </p>
      <Button
        gray
        size="large"
        loading={isLoading}
        onClick={handleCancelSubcription}
        className="w-full mt-6 text-base"
      >
        Confirm
      </Button>
    </Modal>
  )
}

export default SwitchToAnnual
