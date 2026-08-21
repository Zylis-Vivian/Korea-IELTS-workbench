#!/usr/bin/env node
/**
 * Build the curriculum-preserving Yonsei vocabulary dataset.
 *
 * The general vocabulary merge intentionally deduplicates Korean strings for
 * dictionary use.  A curriculum needs the opposite: repeated entries must
 * remain attached to their book, lesson, unit and source order.  This script
 * keeps the upstream six-volume rows intact and enriches them with the
 * romanization and supplemental fields already used by the workbench.
 */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const sourceDir = path.resolve(parseArg('--source-dir', path.join(ROOT, 'tmp/open-yonsei-korean-vocabulary/data/json')))
const outputPath = path.resolve(parseArg('--output', path.join(ROOT, 'data/yonsei-curriculum.json')))
const enrichedPath = path.join(ROOT, 'data/yonsei-korean.json')

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function clean(value) {
  return value == null ? '' : String(value).replace(/\u00a0/g, ' ').trim()
}

function firstNonEmpty(...values) {
  return values.map(clean).find(Boolean) || ''
}

const CHO = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h']
const JUNG = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i']
const JONG = ['', 'k', 'k', 'k', 'n', 'n', 'n', 't', 'l', 'k', 'm', 'l', 'l', 'l', 'l', 'l', 'm', 'p', 'p', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 't']
const JONG_AS_INITIAL = ['', 'g', 'kk', 'gs', 'n', 'nj', 'nh', 'd', 'r', 'lg', 'lm', 'lb', 'ls', 'lt', 'lp', 'lh', 'm', 'b', 'bs', 's', 'ss', 'ng', 'j', 'ch', 'k', 't', 'p', 'h']

function romanizeKo(text) {
  const syllables = []
  for (const char of String(text)) {
    const codePoint = char.codePointAt(0)
    if (codePoint >= 0xac00 && codePoint <= 0xd7a3) {
      const syllable = codePoint - 0xac00
      syllables.push({
        cho: Math.floor(syllable / 588),
        jung: Math.floor((syllable % 588) / 28),
        jong: syllable % 28,
        korean: true,
      })
    } else {
      syllables.push({ raw: char, korean: false })
    }
  }
  return syllables.map((syllable, index) => {
    if (!syllable.korean) return syllable.raw
    const next = syllables[index + 1]
    const nextCho = next?.korean ? next.cho : -1
    if (syllable.jong === 0) return CHO[syllable.cho] + JUNG[syllable.jung]
    if (nextCho === 11) return CHO[syllable.cho] + JUNG[syllable.jung] + JONG_AS_INITIAL[syllable.jong]
    const isNasal = nextCho === 2 || nextCho === 6
    const isSibilant = nextCho === 9 || nextCho === 10
    let final = JONG[syllable.jong]
    if (isNasal || isSibilant) {
      if ([17, 18, 26].includes(syllable.jong)) final = 'm'
      else if (isNasal && [1, 2, 24].includes(syllable.jong)) final = 'ng'
      else if (isNasal && [7, 25].includes(syllable.jong)) final = 'n'
    }
    return CHO[syllable.cho] + JUNG[syllable.jung] + final
  }).join('')
}

function parseArg(name, fallback) {
  const index = process.argv.indexOf(name)
  if (index < 0 || !process.argv[index + 1]) return fallback
  return process.argv[index + 1]
}

const volumeFiles = fs
  .readdirSync(sourceDir)
  .filter((file) => /^vol-\d+\.json$/i.test(file))
  .sort()

if (volumeFiles.length !== 6) {
  throw new Error(`Expected six Yonsei volume JSON files in ${sourceDir}, found ${volumeFiles.length}`)
}

const enrichedRows = fs.existsSync(enrichedPath) ? readJson(enrichedPath) : []
const enrichedByKorean = new Map()
for (const row of enrichedRows) {
  if (row?.korean && !enrichedByKorean.has(row.korean)) enrichedByKorean.set(row.korean, row)
}

const volumes = []
const rows = []

for (const file of volumeFiles) {
  const payload = readJson(path.join(sourceDir, file))
  const volume = Number(payload.metadata?.volume)
  const chapters = (payload.metadata?.chapters || []).map((chapter) => ({
    chapter: Number(chapter.chapter),
    ko: clean(chapter.ko),
    zh: clean(chapter.zh),
    en: clean(chapter.en),
  }))
  const chapterByNumber = new Map(chapters.map((chapter) => [chapter.chapter, chapter]))
  const sourceRows = Array.isArray(payload.rows) ? payload.rows : []

  if (!Number.isInteger(volume) || volume < 1 || volume > 6) {
    throw new Error(`${file}: invalid volume ${payload.metadata?.volume}`)
  }
  if (sourceRows.length !== Number(payload.row_count)) {
    throw new Error(`${file}: row_count mismatch (${payload.row_count} vs ${sourceRows.length})`)
  }

  volumes.push({
    volume,
    book: `延世韩国语${volume}`,
    unitsPerChapter: Number(payload.metadata?.units_per_chapter || 0),
    accent: payload.metadata?.accent || '',
    chapters,
  })

  for (const source of sourceRows) {
    const korean = clean(source.korean)
    const chapter = Number(source.chapter)
    const unit = Number(source.unit)
    const lessonMeta = chapterByNumber.get(chapter)
    const enriched = enrichedByKorean.get(korean) || {}

    if (!source.entry_id || !korean || !lessonMeta || !Number.isInteger(unit)) {
      throw new Error(`${file}: invalid source row ${JSON.stringify(source)}`)
    }

    rows.push({
      id: source.entry_id,
      entryId: source.entry_id,
      volume,
      book: `延世韩国语${volume}`,
      chapter,
      lesson: chapter,
      unit,
      sequence: Number(source.sequence),
      sourceOrder: Number(source.source_order),
      chapterKo: lessonMeta.ko,
      chapterZh: lessonMeta.zh,
      chapterEn: lessonMeta.en,
      topic: `延世${volume}·${lessonMeta.zh}`,
      korean,
      romanization: firstNonEmpty(enriched.romanization, romanizeKo(korean)),
      chinese: firstNonEmpty(source.chinese, enriched.chinese),
      english: firstNonEmpty(source.english, enriched.english),
      entryKind: firstNonEmpty(source.entry_kind, enriched.entryKind, enriched.entry_kind),
      partOfSpeech: firstNonEmpty(source.pos, enriched.posKo, enriched.partOfSpeech),
      pos: firstNonEmpty(source.pos, enriched.posKo, enriched.pos),
      posZh: firstNonEmpty(source.pos_zh, enriched.posZh),
      posKo: firstNonEmpty(source.pos, enriched.posKo),
      originType: firstNonEmpty(source.origin_type, enriched.originType),
      originDetail: firstNonEmpty(source.origin_detail, enriched.originDetail),
      pronunciation: firstNonEmpty(source.pronunciation, enriched.pronunciation),
      phonetic: firstNonEmpty(enriched.phonetic),
      grammar: firstNonEmpty(source.origin_detail, enriched.grammar),
      level: String(volume),
      reviewStatus: firstNonEmpty(source.review_status, enriched.reviewStatus),
      matchConfidence: Number(source.match_confidence || enriched.matchConfidence || 0),
      dictionarySource: firstNonEmpty(source.dictionary_source),
      revisionNote: firstNonEmpty(source.revision_note),
      source: `Yonsei vol-${volume}`,
      exampleSentences: Array.isArray(enriched.exampleSentences) ? enriched.exampleSentences : [],
    })
  }
}

volumes.sort((a, b) => a.volume - b.volume)
rows.sort((a, b) =>
  a.volume - b.volume ||
  a.lesson - b.lesson ||
  a.unit - b.unit ||
  a.sourceOrder - b.sourceOrder
)

const ids = new Set()
const missingRomanization = []
for (const row of rows) {
  if (ids.has(row.entryId)) throw new Error(`Duplicate entryId: ${row.entryId}`)
  ids.add(row.entryId)
  if (!row.romanization) missingRomanization.push(row.entryId)
}
if (missingRomanization.length) {
  throw new Error(`Missing romanization for ${missingRomanization.length} rows: ${missingRomanization.slice(0, 5).join(', ')}`)
}

const uniqueKorean = new Set(rows.map((row) => row.korean))
const output = {
  schemaVersion: 1,
  projectVersion: '0.1.0',
  sourceRepository: 'https://github.com/Amulopapa67/open-yonsei-korean-vocabulary',
  rowCount: rows.length,
  uniqueKoreanCount: uniqueKorean.size,
  volumes,
  rows,
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf8')
console.log(JSON.stringify({
  output: outputPath,
  rows: rows.length,
  uniqueKorean: uniqueKorean.size,
  volumes: volumes.length,
  lessons: new Set(rows.map((row) => `${row.volume}-${row.lesson}`)).size,
}, null, 2))
