import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Alert from '../Alert'
import Button from '../Button'
import Modal from '../Modal'

type CancelSubscriptionProps = { periodEnd?: string; open?: boolean; setOpen: (value) => void }

const CancelSubscription: React.FC<CancelSubscriptionProps> = ({ periodEnd, open, setOpen }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleCancelSubcription(): Promise<void> {
    setIsLoading(true)
    const rs = await fetch('/api/crux/user/subscription', {
      method: 'DELETE',
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
      <Modal title="Cancel your account?" open={open} setOpen={setOpen}>
        <p className="text-base text-neutral-1000">
          If you cancel now, you’ll have access until {periodEnd}. After that, you’ll have to
          subscribe again.
        </p>
        <Button
          cancel
          size="large"
          loading={isLoading}
          onClick={handleCancelSubcription}
          className="w-full mt-8 text-base"
        >
          Confirm
        </Button>
      </Modal>
    </>
  )
}

export default CancelSubscription
