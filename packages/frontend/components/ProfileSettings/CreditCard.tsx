import React, { useEffect, useState } from 'react'
import { GetUserResponse } from '@/utils/typings'
import Link from 'next/link'

import MasterCard from '../Svgs/MasterCard'
import Visa from '../Svgs/Visa'
import AddCreditCard from '../Svgs/AddCreditCard'
import AmexCard from '../Svgs/AmexCard'
import AppleCard from '../Svgs/AppleCard'
import Discover from '../Svgs/DIscover'

const CARD_BRANDS = {
  amex: 'AMEX',
  cartes_bancaires: 'Cartes Bancaires',
  diners_club: 'Diners Club',
  discover: 'Discover',
  jcb: 'JCB',
  mastercard: 'Mastercard',
  visa: 'Visa',
  unionpay: 'UnionPay',
}

export type UpdateCardForm = {
  card: string
  cvc: string
  expiration: string
}

const CreditCard: React.FC = () => {
  const [cardBrand, setCardBrand] = useState('')
  const [currentCard, setCurrentCard] = useState('')
  const [currentCardExp, setCurrentCardExp] = useState('')

  function brandIcon(): any {
    switch (cardBrand) {
      case 'AMEX':
        return <AmexCard />
      case 'Visa':
        return <Visa />
      case 'MasterCard':
        return <MasterCard />
      case 'Apple':
        return <AppleCard />
      case 'Discover':
        return <Discover />
      default:
        return <CreditCard />
    }
  }

  useEffect(() => {
    ;(async () => {
      const rs = await fetch('/api/crux/user', {
        method: 'GET',
      })
      const data = (await rs.json()) as GetUserResponse
      const card = data.cards?.[0]
      if (card) {
        setCardBrand(CARD_BRANDS[card?.brand] || card?.brand || 'Card')
        setCurrentCard(card?.last4)
      }
      setCurrentCardExp(`${card?.expiryMonth}/${card?.expiryYear}`)
    })()
  }, [setCurrentCard, setCurrentCardExp, setCardBrand])

  return (
    <div>
      {!currentCard && !currentCardExp ? (
        <div className="xs:bg-neutral-090  rounded-xl h-40 animate-pulse"></div>
      ) : (
        <>
          {currentCard && currentCardExp && (
            <div className="xs:bg-neutral-090 border-b border-neutral-300 xs:border-none overflow-hidden pt-6 text-sm leading-3.5 xs:rounded-xl tracking-tight">
              <h1 className="text-1xl ml-4 mb-2">Payment Method</h1>
              <div className="w-full flex items-center pl-5 hover:shadow-gradient-hover active:shadow-gradient-pressed h-16">
                <span>{brandIcon()}</span>
                <div className="leading-5 pb-6 mt-5 border-b border-neutral-300 relative left-5 w-full text-base">
                  <span className="relative top-0.5">
                    {cardBrand} {currentCard}
                  </span>
                </div>
              </div>
              <Link href="/subscription/methods">
                <div className="w-full flex items-center pl-5 cursor-pointer hover:shadow-gradient-hover active:shadow-gradient-pressed h-16">
                  <span className="flex items-center">
                    <AddCreditCard />
                    <span className="leading-5 relative left-5 text-base">
                      {currentCard && currentCardExp
                        ? 'Replace payment method'
                        : 'Add payment method'}
                    </span>
                  </span>
                </div>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CreditCard
