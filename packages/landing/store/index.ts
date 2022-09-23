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
    })
  }

  getBookmarks = async (): Promise<void> => {
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
      })
    }
    runInAction(() => {
      this.bookmarksLoading = false
    })
  }

  addBookmark = async (videoId: string): Promise<void> => {
    if (!videoId) return
    runInAction(() => {
      this.bookmarksLoading = true
    })
    await fetch('/api/crux/user/bookmark', {
      method: 'POST',
      body: JSON.stringify({ videoId }),
    })
    await this.getBookmarks()
  }

  removeBookmark = async (videoId: string): Promise<void> => {
    if (!videoId) return
    runInAction(() => {
      this.bookmarksLoading = true
    })
    await fetch(`/api/crux/user/bookmark/${videoId}`, {
      method: 'DELETE',
    })
    await this.getBookmarks()
  }

  register = async (data: RegisterBody): Promise<RegisterResponse> => {
    const rs = await register(data)
    if (rs.statusCode === 200 && rs.body?.userId) {
      runInAction(() => {
        this.userId = rs.body?._id
        this.userName = rs.body?.name
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

  hydrate = (data) => {
    if (!data) return

    this.lastUpdate = data.lastUpdate !== null ? data.lastUpdate : Date.now()
  }
}
