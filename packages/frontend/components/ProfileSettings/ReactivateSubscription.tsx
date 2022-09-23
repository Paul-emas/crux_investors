import React, { useState } from 'react'
import { useRouter } from 'next/router'

import Button from '../Button'
import Modal from '../Modal'
import Alert from '../Alert'

type ReactivateSubscriptionProps = { periodEnd?: string; open?: boolean; setOpen: (value) => void }

const ReactivateSubscription: React.FC<ReactivateSubscriptionProps> = ({
  periodEnd,
  open,
  setOpen,
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleReactivateSubscription(): Promise<void> {
    setIsLoading(true)
    const rs = await fetch('/api/crux/user/subscription', {
      method: 'PUT',
      body: JSON.stringify({
        action: 'reactivate',
      }),
    })
    if (rs.status !== 200) {
      setIsLoading(false)
      setErrorMessage((await rs.json()).message)
      setOpenAlert(true)
    } else {
      setIsLoading(false)
      setOpen(false)
      router.reload()
    }
  }

  return (
    <>
      <Alert icon error={errorMessage ? true : false} open={openAlert} setOpen={setOpenAlert}>
        {errorMessage}
      </Alert>
      <Modal title="Re-activate Membership?" open={open} setOpen={setOpen}>
        <p className="text-base text-neutral-1000">
          Click ‘Confirm’ below to switch to re-activate your membership. Your subscription will
          auto-renew and you will be charged on {periodEnd}.
        </p>
        <Button
          gray
          size="large"
          loading={isLoading}
          onClick={handleReactivateSubscription}
          className="w-full mt-8 text-base"
        >
          Confirm
        </Button>
      </Modal>
    </>
  )
}

export default ReactivateSubscription
