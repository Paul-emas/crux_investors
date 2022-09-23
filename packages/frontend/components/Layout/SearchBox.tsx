/* eslint-disable jsx-a11y/no-static-element-interactions */
import Search from '@components/Svgs/Search'
import algoliaSearch from 'algoliasearch/lite'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { useState } from 'react'
import { Configure, connectHits, connectSearchBox, InstantSearch } from 'react-instantsearch-dom'

const searchClient = algoliaSearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
)

const getUrl = (hit): string => {
  const { objectID, type } = hit
  if (type === 'video') {
    return `/v/${objectID}`
  } else {
    return `/${type}/${objectID}`
  }
}

const Hits: React.FC<any> = (props) => {
  const { hits, focused, setFocused } = props

  const hasText = hits.some((hit) => hit?._highlightResult?.name?.matchedWords?.length)
  if (!hits.length) {
    return null
  }

  return (
    <div
      className={classNames('absolute top-10 w-full group-focus:block focus-within:block', {
        hidden: !focused,
        block: focused,
      })}
    >
      <div className="h-4.25 pointer-events-none"></div>
      <div className="pb-2 bg-neutral-090 w-full rounded-lg border-none overflow-hidden">
        {hasText || !hits.length ? null : (
          <div className="pl-4 pt-4 pb-4 leading-5 text-1xl tracking-tight text-neutral-035 font-title">
            Trending
          </div>
        )}
        {hits.map((hit, index) => (
          <Link href={getUrl(hit)} key={hit.objectID}>
            <a>
              <button
                onClick={() => setFocused(false)}
                className="w-full pl-6 flex items-center h-11 group hover:bg-neutral-090 hover:shadow-gradient-hover active:shadow-gradient-pressed duration-200"
              >
                <div className="-mt-0.5">
                  <Search />
                </div>
                <div
                  className={`${
                    hits.length - 1 !== index && 'border-b'
                  } pb-6 leading-5 text-left border-neutral-300 group-hover:border-transparent relative left-5 w-full duration-100 text-base`}
                >
                  <div className="relative w-44 top-3 truncate">{hit.name}</div>
                </div>
              </button>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

const CustomHits = connectHits(Hits)

const SearchBox: React.FC<any> = ({
  currentRefinement,
  refine,
  onFocus = null,
  onBlur = null,
  onSubmit = null,
}) => (
  <form onSubmit={onSubmit} noValidate role="search">
    <input
      type="search"
      value={currentRefinement}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={(event) => refine(event.currentTarget.value)}
      className="w-64 h-9 rounded-lg bg-neutral-300 placeholder-neutral-500 pl-16 focus:outline-none focus:shadow-input-search transition-colors text-xsm"
      placeholder="Search"
    />
  </form>
)

const CustomSearchBox = connectSearchBox(SearchBox) as any

const CruxSearchBox: React.FC<any> = () => {
  const router = useRouter()

  const [focused, setFocused] = useState(false)
  const [searchState, setSearchState] = useState<any>({})

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (searchState.query) {
        router.push(`/search?q=${encodeURIComponent(searchState.query)}`)
      }
    },
    [searchState, router]
  )

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if ((e?.relatedTarget as Element)?.nodeName === 'A') {
        router.push((e?.relatedTarget as HTMLLinkElement).href)
      }
    },
    [router]
  )

  return (
    <div className="hidden md:flex flex-3 justify-between md:mx-10">
      {focused && (
        <button
          onClick={() => setFocused(false)}
          className="absolute w-full outline-none border-none shadow-none min-h-screen inset-0"
        ></button>
      )}
      <div className="flex-1">
        <div className="relative float-right lg:float-none xl:float-none">
          <span className="absolute inset-y-0 left-0 flex items-center pl-6">
            <Search />
          </span>
          <InstantSearch
            searchClient={searchClient}
            searchState={searchState}
            onSearchStateChange={setSearchState}
            indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
          >
            <Configure
              index={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
              hitsPerPage={5}
              filters={'NOT type:video'}
            />
            <CustomSearchBox onFocus={() => setFocused(true)} onBlur={onBlur} onSubmit={onSubmit} />
            <CustomHits focused={focused} setFocused={setFocused} />
          </InstantSearch>
        </div>
      </div>
    </div>
  )
}

export default CruxSearchBox
