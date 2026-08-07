import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHeader } from '../../components/Layout'
import SpeakerButton from '../../components/SpeakerButton'
import HandwritingPad from '../../components/HandwritingPad'
import AddWordButton from '../../components/AddWordButton'
import { useStore } from '../../stores/useStore'
import { VOWELS, CONSONANTS, BATCHIMS, strokeOf } from '../../data/alphabet'
import type { Sound, Mastery } from '../../types'

type Tab = 'vowel' | 'consonant' | 'batchim'
const TABS: { key: Tab; label: string; data: Sound[] }[] = [
  { key: 'vowel', label: '元音 (21)', data: VOWELS },
  { key: 'consonant', label: '辅音 (19)', data: CONSONANTS },
  { key: 'batchim', label: '收音 (27)', data: BATCHIMS },
]

/** 韩文音节组成：用 Unicode 规范 Jamo 码点(U+1100/U+1161/U+11A8)直接计算，不依赖手写顺序 */
const INITIAL_CODE: Record<string, number> = { 'ㄱ':0x1100,'ㄲ':0x1101,'ㄴ':0x1102,'ㄷ':0x1103,'ㄸ':0x1104,'ㄹ':0x1105,'ㅁ':0x1106,'ㅂ':0x1107,'ㅃ':0x1108,'ㅅ':0x1109,'ㅆ':0x110A,'ㅇ':0x110B,'ㅈ':0x110C,'ㅉ':0x110D,'ㅊ':0x110E,'ㅋ':0x110F,'ㅌ':0x1110,'ㅍ':0x1111,'ㅎ':0x1112 }
const MEDIAL_CODE: Record<string, number> = { 'ㅏ':0x1161,'ㅐ':0x1162,'ㅑ':0x1163,'ㅒ':0x1164,'ㅓ':0x1165,'ㅔ':0x1166,'ㅕ':0x1167,'ㅖ':0x1168,'ㅗ':0x1169,'ㅘ':0x116A,'ㅙ':0x116B,'ㅚ':0x116C,'ㅛ':0x116D,'ㅜ':0x116E,'ㅝ':0x116F,'ㅞ':0x1170,'ㅟ':0x1171,'ㅠ':0x1172,'ㅡ':0x1173,'ㅢ':0x1174,'ㅣ':0x1175 }
const FINAL_CODE: Record<string, number> = { 'ㄱ':0x11A8,'ㄲ':0x11A9,'ㄳ':0x11AA,'ㄴ':0x11AB,'ㄵ':0x11AC,'ㄶ':0x11AD,'ㄷ':0x11AE,'ㄹ':0x11AF,'ㄺ':0x11B0,'ㄻ':0x11B1,'ㄼ':0x11B2,'ㄽ':0x11B3,'ㄾ':0x11B4,'ㄿ':0x11B5,'ㅀ':0x11B6,'ㅁ':0x11B7,'ㅂ':0x11B8,'ㅄ':0x11B9,'ㅅ':0x11BA,'ㅆ':0x11BB,'ㅇ':0x11BC,'ㅈ':0x11BD,'ㅊ':0x11BE,'ㅋ':0x11BF,'ㅌ':0x11C0,'ㅍ':0x11C1,'ㅎ':0x11C2 }

function composeSyllable(initial: string, medial: string, final = ''): string {
  const i = INITIAL_CODE[initial]
  const v = MEDIAL_CODE[medial]
  if (i === undefined || v === undefined) return initial + medial + final
  let f = 0
  if (final) {
    const fc = FINAL_CODE[final]
    if (fc === undefined) return initial + medial + final
    f = fc - 0x11A8 + 1
  }
  return String.fromCodePoint(0xAC00 + (i - 0x1100) * 588 + (v - 0x1161) * 28 + f)
}

/** 获取字符本身的基础发音（非名称、非示例词） */
function getMainSound(s: Sound): string {
  switch (s.category) {
    case 'vowel':
      // 元音：纯元音（아/어/오...）
      return s.name
    case 'consonant':
      // 辅音：字母 + ㅏ = 基础发音（ㄱ→가, ㄴ→나, ㄷ→다...），标准教学做法
      return composeSyllable(s.char, 'ㅏ')
    case 'batchim':
      // 收音：아 + 收音 = 该收音在词尾的发音（ㄱ→악, ㄴ→안, ㄷ→앋...）
      return composeSyllable('ㅇ', 'ㅏ', s.char)
    default:
      return s.example?.word || s.char
  }
}

export default function KoreanAlphabet() {
  const [tab, setTab] = useState<Tab>('vowel')
  const [sel, setSel] = useState<Sound>(VOWELS[0])
  const mastery = useStore((s) => s.mastery)
  const setMastery = useStore((s) => s.setMastery)
  const recordHandwriting = useStore((s) => s.recordHandwriting)
  const handwriting = useStore((s) => s.handwriting)

  const tabData = TABS.find((t) => t.key === tab)!.data
  const states = { unlearned: 0, learning: 0, mastered: 0 }
  tabData.forEach((s) => {
    states[mastery[s.char] || 'unlearned']++
  })

  /** 当前 tab 第一个未学字符；全部学完则为 null */
  const firstUnlearned = tabData.find((s) => !mastery[s.char]) ?? null
  /** 从 from 起顺时针找到下一个未学字符；若本 tab 已全部掌握，则返回下一个字符（循环） */
  const nextUnlearned = (from: Sound): Sound => {
    const idx = tabData.findIndex((s) => s.char === from.char)
    for (let k = 1; k <= tabData.length; k++) {
      const cand = tabData[(idx + k) % tabData.length]
      if (!mastery[cand.char]) return cand
    }
    return tabData[(idx + 1) % tabData.length]
  }

  const open = (s: Sound) => {
    setSel(s)
    if (!mastery[s.char]) setMastery(s.char, 'learning')
  }

  const hw = handwriting[sel.char]
  const hwRate = hw ? Math.round(hw.totalScore / hw.count) : null

  return (
    <div className="fade-in">
      <PageHeader title="四十音图" desc="韩语发音入门核心：元音 · 辅音 · 收音，点字符听发音、描摹书写并智能评分。" />

      <div className="flex gap-2 mb-4">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setTab(t.key)
              setSel(t.data[0])
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              tab === t.key
                ? 'bg-lavender text-white shadow-soft'
                : 'bg-white text-gray-500 hover:bg-lavender-light/60'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        {/* 字符网格 */}
        <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
            <span>进度</span>
            <div className="flex items-center gap-2">
              {firstUnlearned && (
                <button
                  onClick={() => open(firstUnlearned)}
                  className="px-3 py-1 rounded-full bg-lavender text-white text-xs font-medium hover:bg-lavender-deep shadow-soft transition"
                >
                  开始学习 →
                </button>
              )}
              <span>
                未学 {states.unlearned} · 学习中 {states.learning} · 已掌握 {states.mastered}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
            {tabData.map((s) => {
              const m = mastery[s.char]
              return (
                <button
                  key={s.char}
                  onClick={() => open(s)}
                  className={`relative aspect-square rounded-xl flex items-center justify-center text-3xl korean-font transition ${
                    sel.char === s.char
                      ? 'bg-lavender text-white shadow-soft'
                      : m === 'mastered'
                      ? 'bg-mint/40 text-lavender-deep'
                      : m === 'learning'
                      ? 'bg-lavender-light text-lavender-deep'
                      : 'bg-cream text-gray-700 hover:bg-lavender-light/60'
                  }`}
                >
                  {s.char}
                  {m === 'mastered' && (
                    <span className="absolute -top-1 -right-1 text-[10px] bg-emerald-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                      ✓
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* 详情 */}
        <motion.div key={sel.char} className="bg-white rounded-card shadow-card p-5 fade-in">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-6xl korean-font text-lavender-deep">{sel.char}</div>
              <div className="text-sm text-gray-400 mt-1">
                {sel.name} · {sel.group}
              </div>
            </div>
            <SpeakerButton text={getMainSound(sel)} size={22} />
          </div>

          <div className="mt-3 text-sm">
            <div className="text-gray-500">罗马音</div>
            <div className="font-semibold text-lavender-deep">{sel.romanization}</div>
          </div>

          <div className="mt-3 text-sm text-gray-700 leading-relaxed">{sel.description}</div>

          {sel.example && (
            <div className="mt-3 p-3 rounded-xl bg-lavender-light/50">
              <div className="flex items-center justify-between">
                <span className="text-lg korean-font font-bold">{sel.example.word}</span>
                <SpeakerButton text={sel.example.word} />
              </div>
              <div className="text-xs text-gray-500">
                {sel.example.roman} · {sel.example.zh}
              </div>
              <div className="mt-1">
                <AddWordButton
                  korean={sel.example.word}
                  romanization={sel.example.roman}
                  chinese={sel.example.zh}
                  source="四十音"
                />
              </div>
            </div>
          )}

          <div className="mt-4 border-t border-lavender-light pt-3">
            <div className="text-sm font-medium text-lavender-deep mb-2">✍️ 手写练习（描摹虚线轮廓）</div>
            <HandwritingPad
              target={sel.char}
              expectedStrokes={strokeOf(sel.char)}
              onScore={(sc) => recordHandwriting(sel.char, sc)}
            />
            {hw && (
              <div className="text-xs text-gray-400 text-center mt-1">
                已练习 {hw.count} 次，平均 {hwRate} 分
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => open(nextUnlearned(sel))}
              className="flex-1 py-2 rounded-full bg-lavender-light text-lavender-deep text-sm font-medium hover:bg-lavender/30 transition"
            >
              下一个未学 →
            </button>
            <button
              onClick={() => setMastery(sel.char, 'mastered')}
              className="flex-1 py-2 rounded-full bg-mint/60 text-emerald-700 text-sm font-medium hover:bg-mint"
            >
              标记为已掌握
            </button>
            <button
              onClick={() => setMastery(sel.char, 'unlearned')}
              className="px-3 py-2 rounded-full bg-gray-100 text-gray-500 text-sm hover:bg-gray-200"
            >
              重置
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
