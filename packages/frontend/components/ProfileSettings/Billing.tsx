import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { GetSubscriptionResponse } from '@/utils/typings'

import Button from '@components/Button'
import CancelSubscription from './CancelSubscription'
import SwitchToAnnual from './SwitchToAnnual'
import ReactivateSubscription from './ReactivateSubscription'

const Billing: React.FC = ({ children }) => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [subscriptionType, setSubscriptionType] = useState('')
  const [subscriptionActive, setSubscriptionActive] = useState(false)
  const [billingType, setBillingType] = useState('')
  const [periodEnd, setPeriodEnd] = useState('')
  const [openCancelSubPlanModal, setOpenCancelSubPlanModal] = useState(false)
  const [openReactivateModal, setOpenReactivateModal] = useState(false)
  const [openAnnualModal, setOpenAnnualModal] = useState(false)

  let action = null
  const subType = subscriptionType === 'active' && billingType === 'monthly'

  useEffect(() => {
    ;(async () => {
      const rs = await fetch('/api/crux/user/subscription', {
        method: 'GET',
      })
      const data = (await rs.json()) as GetSubscriptionResponse
      if (rs.status === 200 && !data.subscription) {
        router.push('/signup?cf=1')
        return
      }

      if (rs.status === 200 && data.subscription && !data.subscription.active) {
        router.push('/signup?cf=1')
        return
      }

      if (rs.status === 403 && (data as any)?.code === 1) {
        router.push('/signup?cf=1')
        return
      }

      setSubscriptionType(data?.subscription?.canceledAt ? 'inactive' : 'active')
      setSubscriptionActive(data?.subscription?.active)
      setPeriodEnd(dayjs(data?.subscription?.stripe?.currentPeriodEnd).format('LL'))
      setBillingType(data?.subscription?.type)
      setLoading(false)
    })()
  }, [setBillingType, setSubscriptionType, setPeriodEnd, setLoading, setSubscriptionActive, router])

  switch (subscriptionType) {
    case 'active':
      action = (
        <Button
          secondaryError
          size="large"
          onClick={() => setOpenCancelSubPlanModal(true)}
          className="w-full mt-6 text-base"
        >
          Cancel Subscription
        </Button>
      )
      break
    case 'inactive':
      action = (
        <Button
          gray
          size="large"
          onClick={() => setOpenReactivateModal(true)}
          className="w-full mt-6 text-base"
        >
          Re-activate Membership
        </Button>
      )
      break

    default:
      break
  }

  return (
    <>
      <CancelSubscription
        periodEnd={periodEnd}
        open={openCancelSubPlanModal}
        setOpen={setOpenCancelSubPlanModal}
      />
      <ReactivateSubscription
        periodEnd={periodEnd}
        open={openReactivateModal}
        setOpen={setOpenReactivateModal}
      />
      <SwitchToAnnual periodEnd={periodEnd} open={openAnnualModal} setOpen={setOpenAnnualModal} />

      <div className="xs:bg-netutral-090">
        {loading ? (
          <div className="xs:bg-neutral-090 px-4 py-3.5 rounded-xl mb-6 h-32 animate-pulse"></div>
        ) : (
          <div className="border-b border-neutral-300 xs:border-none xs:bg-neutral-090 px-4 pt-6 xs:rounded-xl xs:mb-6">
            <h1 className="text-1xl mb-2">Your plan</h1>
            <div className="flex justify-between items-center h-19">
              <div>
                <div className="text-base mb-1">Crux Investor</div>
                {subscriptionType === 'active' ? (
                  <div className="text-sm text-neutral-600">
                    {billingType === 'monthly' ? '$29.95 / month' : '$299 / year'}
                  </div>
                ) : (
                  <div className="text-sm text-neutral-600">Cancelled</div>
                )}
              </div>
              {subType && (
                <Button
                  onClick={() => setOpenAnnualModal(true)}
                  radius="large"
                  size="small"
                  customPx
                  secondary
                  className="px-4 py-3"
                >
                  Switch to annual
                </Button>
              )}
            </div>
          </div>
        )}
        {children}
        {loading ? (
          <div className="xs:bg-neutral-090 px-4 py-3.5 overflow-hidden rounded-xl mt-6 h-52 animate-pulse"></div>
        ) : (
          <>
            {subscriptionType === 'active' && subscriptionActive ? (
              <div className="border-b border-neutral-300 xs:border-none xs:bg-neutral-090 pl-4 pt-6 xs:rounded-xl xs:mt-6">
                <h1 className="text-1xl mb-2">Details</h1>
                <div className="border-b h-19 border-neutral-300 flex items-center">
                  <div>
                    <span className="text-sm text-neutral-500">Access Expires</span>
                    <div className="text-base">{periodEnd}</div>
                  </div>
                </div>
                <div className="h-19 flex items-center">
                  <div>
                    <span className="text-sm text-neutral-500">Access Expires</span>
                    <div className="text-base">{periodEnd}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-b border-neutral-300 xs:border-none xs:bg-neutral-090 pl-4 pt-6 xs:rounded-xl xs:mt-6">
                <h1 className="text-1xl mb-2">Details</h1>
                <div className="h-24 flex items-center">
                  <div>
                    <span className="text-sm text-neutral-600">Access Expires</span>
                    <div className="text-base">{periodEnd}</div>
                    <span className="text-xsm text-neutral-078">
                      After that, you can restart your subscription at any time
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div className="px-4 xs:px-0">{action}</div>
      </div>
    </>
  )
}

export default Billing
