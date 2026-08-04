// 音频索引：关联教材 + 课号。本地 MP3 放入对应 audioFolder 后即可被播放器识别。
// 这里预置若干示例曲目（其余教材的音频随用户放入文件后自动可用，无需改代码）。
export type TrackType = 'dialogue' | 'vocabulary' | 'grammar' | 'reading' | 'exercise' | 'full-lesson'

export interface AudioTrack {
  id: string
  bookId: string
  lesson: number
  title: string
  filePath: string // /audio/korean/yonsei-1/lesson-01.mp3
  duration: number // 秒
  type: TrackType
  source: 'local' | 'ximalaya' | 'qingting'
}

export const audioTracks: AudioTrack[] = [
  // 延世韩国语 1（示例前 6 课，验证播放器与教材联动）
  ...[1, 2, 3, 4, 5, 6].map<AudioTrack>((n) => ({
    id: `yonsei-1-${n}`,
    bookId: 'yonsei-1',
    lesson: n,
    title: `第 ${n} 课 对话与单词`,
    filePath: `/audio/korean/yonsei-1/lesson-${String(n).padStart(2, '0')}.mp3`,
    duration: 240 + n * 10,
    type: 'full-lesson' as TrackType,
    source: 'local' as const,
  })),
  // 标准韩国语 1（示例 3 课）
  ...[1, 2, 3].map<AudioTrack>((n) => ({
    id: `std-korean-1-${n}`,
    bookId: 'std-korean-1',
    lesson: n,
    title: `第 ${n} 课 听力`,
    filePath: `/audio/korean/std-korean-1/lesson-${String(n).padStart(2, '0')}.mp3`,
    duration: 200 + n * 8,
    type: 'listening' as TrackType,
    source: 'local' as const,
  })),
  // 剑桥雅思 10（示例 4 套听力 Section）
  ...[1, 2, 3, 4].map<AudioTrack>((n) => ({
    id: `cambridge-10-${n}`,
    bookId: 'cambridge-10',
    lesson: n,
    title: `Test ${n} 听力`,
    filePath: `/audio/ielts/cambridge-10/test-${n}.mp3`,
    duration: 1800,
    type: 'listening' as TrackType,
    source: 'local' as const,
  })),
]

export function tracksByBook(bookId: string): AudioTrack[] {
  return audioTracks
    .filter((t) => t.bookId === bookId)
    .sort((a, b) => a.lesson - b.lesson)
}
