// 喜马拉雅专辑（在线音频）预置数据。
// 未配置 app_key 时静默降级（不报错）；填入设置后即可解锁在线播放。
// album_id / sound_id 请用户在喜马拉雅网页 URL 中获取后补充。
export interface XimalayaAlbum {
  id: string
  name: string
  bookId?: string
  language: 'korean' | 'english'
  albumUrl: string
  albumId: string // 喜马拉雅专辑 ID（占位，待用户补全）
  lessons: number
  note: string
  verified: boolean // 是否已验证可播放
}

export const ximalayaAlbums: XimalayaAlbum[] = [
  { id: 'xm-yonsei-1', name: '延世韩国语第一册', bookId: 'yonsei-1', language: 'korean', albumUrl: 'https://www.ximalaya.com/', albumId: '', lessons: 50, note: '从喜马拉雅搜索"延世韩国语第一册"获取专辑ID', verified: false },
  { id: 'xm-yonsei-2', name: '延世韩国语第二册', bookId: 'yonsei-2', language: 'korean', albumUrl: 'https://www.ximalaya.com/', albumId: '', lessons: 50, note: '从喜马拉雅搜索获取专辑ID', verified: false },
  { id: 'xm-sejong', name: '世宗韩国语 1-8 册', bookId: 'sejong-1', language: 'korean', albumUrl: 'https://www.ximalaya.com/', albumId: '', lessons: 96, note: '世宗学堂官方音频', verified: false },
  { id: 'xm-std', name: '标准韩国语第一册', bookId: 'std-korean-1', language: 'korean', albumUrl: 'https://www.ximalaya.com/', albumId: '', lessons: 30, note: '北大版教材音频', verified: false },
  { id: 'xm-pron', name: '韩语发音入门', bookId: 'korean-pron-guide', language: 'korean', albumUrl: 'https://www.ximalaya.com/', albumId: '', lessons: 20, note: '发音专项', verified: false },
  { id: 'xm-cam-10', name: '剑桥雅思 10 听力', bookId: 'cambridge-10', language: 'english', albumUrl: 'https://www.ximalaya.com/', albumId: '', lessons: 4, note: '真题听力音频', verified: false },
  { id: 'xm-cam-11', name: '剑桥雅思 11 听力', bookId: 'cambridge-11', language: 'english', albumUrl: 'https://www.ximalaya.com/', albumId: '', lessons: 4, note: '真题听力音频', verified: false },
  { id: 'xm-speaking', name: '雅思口语示范答案', language: 'english', albumUrl: 'https://www.ximalaya.com/', albumId: '', lessons: 60, note: '高分口语示范', verified: false },
  { id: 'xm-writing', name: '雅思写作高分范文朗读', language: 'english', albumUrl: 'https://www.ximalaya.com/', albumId: '', lessons: 40, note: '范文朗读', verified: false },
]
