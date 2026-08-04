// src/utils/koreanPhonetics.ts
// 韩语音变（음운변화）预处理：用于把书写体转换为更接近实际读音的拼写，
// 再交给 TTS 朗读。覆盖 TOPIK 中级常见音变：
//   连音化(연음화) / 鼻音化(비음화) / 送气化(격음화) / 口盖音化(구개음화)
//   / 紧音化(된소리되기) / ㅎ 脱落。
// 注意：单个字母（四十音）不应用音变，见 applyPhoneticsIfNeeded。

const ONSET = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
const NUC = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']
const CODA = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

const oi = (c: string) => ONSET.indexOf(c)
const ni = (c: string) => NUC.indexOf(c)
const ci = (c: string) => CODA.indexOf(c)

export interface Syllable {
  onset: number // 0..18
  nucleus: number // 0..20
  coda: number // 0 = 无收音
}

export function isHangulSyllable(ch: string): boolean {
  const c = ch.codePointAt(0) || 0
  return c >= 0xac00 && c <= 0xd7a3
}

export function decompose(ch: string): Syllable | null {
  const c = ch.codePointAt(0) || 0
  if (c < 0xac00 || c > 0xd7a3) return null
  const base = c - 0xac00
  return {
    onset: Math.floor(base / 588),
    nucleus: Math.floor((base % 588) / 28),
    coda: base % 28,
  }
}

export function compose(s: Syllable): string {
  const code = 0xac00 + (s.onset * 21 + s.nucleus) * 28 + s.coda
  return String.fromCodePoint(code)
}

const isEmptyOnset = (o: number) => o === 0 || o === 11 // 없음 또는 ㅇ(无声)

// 送气映射
const aspirate = (c: string): string => ({ 'ㄱ': 'ㅋ', 'ㄷ': 'ㅌ', 'ㅂ': 'ㅍ', 'ㅈ': 'ㅊ' }[c] || c)
// 紧音映射
const fortis = (c: string): string => ({ 'ㄱ': 'ㄲ', 'ㄷ': 'ㄸ', 'ㅂ': 'ㅃ', 'ㅅ': 'ㅆ', 'ㅈ': 'ㅉ' }[c] || c)
// 鼻音化映射
const nasalize = (c: string): string => ({ 'ㄱ': 'ㅇ', 'ㄷ': 'ㄴ', 'ㅂ': 'ㅁ' }[c] || c)
// 复合收音连音拆分：[保留为收音, 前移到下一字初声]
// 例：ㄺ(ㄹ+ㄱ) 连音时 ㄱ 前移、ㄹ 留作收音
const LINK_SPLIT: Record<string, [string, string]> = {
  'ㄺ': ['ㄹ', 'ㄱ'],
  'ㄻ': ['ㄹ', 'ㅁ'],
  'ㄼ': ['ㄹ', 'ㅂ'],
  'ㄽ': ['ㄹ', 'ㅅ'],
  'ㄾ': ['ㄹ', 'ㅌ'],
  'ㄿ': ['ㄹ', 'ㅍ'],
  'ㅀ': ['ㄹ', ''],
  'ㄶ': ['ㄴ', ''],
  'ㄵ': ['ㄴ', 'ㅈ'],
  'ㄳ': ['ㄱ', 'ㅅ'],
  'ㅄ': ['ㅂ', 'ㅅ'],
}

// 对一组连续音节应用音变规则
function transformRun(sylls: Syllable[]): Syllable[] {
  const S = sylls.map((x) => ({ ...x }))
  const n = S.length
  for (let i = 0; i < n - 1; i++) {
    let C = CODA[S[i].coda] // 当前字收音（字符）
    const O = S[i + 1].onset
    const N = S[i + 1].nucleus
    if (!C) continue
    const setCoda = (ch: string) => (S[i].coda = ci(ch))
    const setNextOnset = (ch: string) => (S[i + 1].onset = oi(ch))

    // 1) 鼻音化：ㄱ/ㄷ/ㅂ + ㄴ/ㅁ
    if (['ㄱ', 'ㄷ', 'ㅂ'].includes(C) && ['ㄴ', 'ㅁ'].includes(ONSET[O])) {
      setCoda(nasalize(C))
    }
    // 2) 流音化：ㅁ/ㅇ + ㄹ → ㄴ；ㄹ + ㄴ/ㅁ → ㄴ
    else if ((['ㅁ', 'ㅇ'].includes(C) && ONSET[O] === 'ㄹ') || (C === 'ㄹ' && ['ㄴ', 'ㅁ'].includes(ONSET[O]))) {
      setNextOnset('ㄴ')
    }
    // 3) ㅎ 收音：+ ㄴ/ㅁ/ㄹ → ㅎ 脱落；+ ㄱ/ㄷ/ㅈ → 送气
    else if (C === 'ㅎ') {
      if (['ㄴ', 'ㅁ', 'ㄹ'].includes(ONSET[O])) setCoda('')
      else if (['ㄱ', 'ㄷ', 'ㅈ'].includes(ONSET[O])) {
        setNextOnset(aspirate(ONSET[O]))
        setCoda('')
      }
    }
    // 4) 送气化：ㄱ/ㄷ/ㅂ/ㅈ + ㅎ(初声) → 送气音，原收音被吞
    else if (['ㄱ', 'ㄷ', 'ㅂ', 'ㅈ'].includes(C) && ONSET[O] === 'ㅎ') {
      setNextOnset(aspirate(C))
      setCoda('')
    }
    // 5) 口盖音化：ㄷ 收音 + ㅣ 类元音 → ㅈ（随后连音）
    else if (C === 'ㄷ' && ['ㅣ', 'ㅑ', 'ㅕ', 'ㅛ', 'ㅠ'].includes(NUC[N])) {
      setCoda('ㅈ')
    }
    // 6) 紧音化：ㄱ/ㄷ/ㅂ/ㄴ/ㅁ/ㄹ + ㄱ/ㄷ/ㅂ/ㅅ/ㅈ → 紧音
    else if (['ㄱ', 'ㄷ', 'ㅂ', 'ㄴ', 'ㅁ', 'ㄹ'].includes(C) && ['ㄱ', 'ㄷ', 'ㅂ', 'ㅅ', 'ㅈ'].includes(ONSET[O])) {
      setNextOnset(fortis(ONSET[O]))
    }

    // 7) 连音化（最后）：剩余收音 + 元音开头 → 收音前移到下一字初声
    C = CODA[S[i].coda]
    if (C && isEmptyOnset(S[i + 1].onset)) {
      const split = LINK_SPLIT[C]
      if (split) {
        setCoda(split[0])
        if (split[1]) setNextOnset(split[1])
      } else {
        setNextOnset(C)
        setCoda('')
      }
    }
  }
  return S
}

// 对整段文本应用音变：提取所有韩文音节，按连续音节序列整体做音变（含跨词连音/鼻音化等），
// 非韩文字符（空格/标点/英文字母）原样保留在原位置。这样句子里的“밥 먹어요”会正确处理为“밤 머거요”。
export function applyPhonetics(text: string): string {
  const chars = [...text]
  const idx: number[] = []
  const sylls: (Syllable | null)[] = chars.map((ch, i) => {
    if (isHangulSyllable(ch)) {
      idx.push(i)
      return decompose(ch)
    }
    return null
  })
  const seq = sylls.filter((s): s is Syllable => s !== null)
  if (seq.length <= 1) return text // 单音节无需音变
  const transformed = transformRun(seq)
  const out = [...chars]
  transformed.forEach((s, k) => {
    out[idx[k]] = compose(s)
  })
  return out.join('')
}

// 仅对「含空格的短语/句子」做音变；单词（无空格）与单个字母不做音变（按用户要求）。
// opts.force=true 时忽略空格判断，强制整段音变（用于测试或明确需要）。
export function applyPhoneticsIfNeeded(text: string, opts?: { force?: boolean }): string {
  if (!opts?.force && !/\s/.test(text)) return text
  return applyPhonetics(text)
}

// 简易单测（仅开发期参考）
export function __selfTest(): { input: string; output: string }[] {
  return [
    { input: '먹어요', output: applyPhonetics('먹어요') }, // 머거요
    { input: '국밥', output: applyPhonetics('국밥') }, // 국뺍
    { input: '좋고', output: applyPhonetics('좋고') }, // 조코
    { input: '해돋이', output: applyPhonetics('해돋이') }, // 해도지
    { input: '국물', output: applyPhonetics('국물') }, // 궁물
  ]
}
