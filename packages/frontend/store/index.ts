import { contentVideosListingMap } from '@utils/acl'
import { Video } from '@utils/mappedTypings'
import { action, makeObservable, observable, runInAction } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

import {
  register,
  RegisterBody,
  RegisterResponse,
  requestForgotPass,
  RequestForgotPassBody,
  RequestForgotPassResponse,
  resetPass,
  ResetPassBody,
  subscribe,
  SubscribeBody,
  SubscribeResponse,
} from './auth'

enableStaticRendering(typeof window === 'undefined')

export class Store {
  lastUpdate = 0

  userId = ''
  userName = ''
  userEmail = ''
  bookmarks: readonly Video[] = []
  bookmarksLoading = false

  constructor() {
    makeObservable(this, {
      bookmarks: observable,
      bookmarksLoading: observable,
      lastUpdate: observable,
      userEmail: observable,
      userId: observable,
      userName: observable,

      addBookmark: action,
      getBookmarks: action,
      hydrate: action,
      register: action,
      removeBookmark: action,
      setUserId: action,
    })
  }

  getBookmarks = async (): Promise<any> => {
    runInAction(() => {
      this.bookmarksLoading = true
    })
    const rs = await fetch('/api/crux/user/bookmark', {
      method: 'GET',
    })
    if (rs.status === 200) {
      const data = await rs.json()
      runInAction(() => {
        this.bookmarks = Object.freeze(contentVideosListingMap({ data }).videos)
        this.bookmarksLoading = false
      })
      return true
    } else if (rs.status === 403) {
      const data = await rs.json()
      if (data?.code === 1) {
        location.href = '/signup?cf=1'
      }
      runInAction(() => {
        this.bookmarksLoading = false
      })
      return { error: 're-join' }
    }
  }

  setUserId = (userId: string): void => {
    this.userId = userId
  }

  addBookmark = async (videoId: string): Promise<boolean> => {
    if (!videoId) return
    ;(global as any)?.analytics?.track('Add Video Bookmark', { id: videoId })

    runInAction(() => {
      this.bookmarksLoading = true
    })
    await fetch('/api/crux/user/bookmark', {
      method: 'POST',
      body: JSON.stringify({ videoId }),
    })
    const rs = await this.getBookmarks()
    if (rs) return true
  }

  removeBookmark = async (videoId: string): Promise<boolean> => {
    if (!videoId) return
    ;(global as any)?.analytics?.track('Remove Video Bookmark', { id: videoId })

    runInAction(() => {
      this.bookmarksLoading = true
    })
    await fetch(`/api/crux/user/bookmark/${videoId}`, {
      method: 'DELETE',
    })
    const rs = await this.getBookmarks()
    if (rs) return true
  }

  register = async (data: RegisterBody): Promise<RegisterResponse> => {
    const rs = await register(data)
    if (rs.statusCode === 200 && rs.body?.userId) {
      runInAction(() => {
        this.userId = rs.body?._id
        this.userEmail = rs.body?.email
      })
    }
    return rs
  }

  requestPassReset = async (data: RequestForgotPassBody): Promise<RequestForgotPassResponse> => {
    const rs = await requestForgotPass(data)
    return rs
  }

  resetPass = async (code: string, data: ResetPassBody): Promise<RequestForgotPassResponse> => {
    const rs = await resetPass(code, data)
    return rs
  }

  subscribe = async (data: SubscribeBody): Promise<SubscribeResponse> => {
    return await subscribe({ userId: this.userId, ...data })
  }

  hydrate = (data): any => {
    if (!data) return

    this.lastUpdate = data.lastUpdate !== null ? data.lastUpdate : Date.now()
  }
}
