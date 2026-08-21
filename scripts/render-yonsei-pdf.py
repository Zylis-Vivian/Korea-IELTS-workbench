#!/usr/bin/env python3
"""Render print-ready Yonsei vocabulary PDFs from the curriculum dataset."""

from __future__ import annotations

import argparse
import html
import json
import os
import re
from collections import Counter
from pathlib import Path
from typing import Any

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    LongTable,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "yonsei-curriculum.json"
OUTPUT_DIR = ROOT / "output" / "pdf"

PAGE = A4
PAGE_W, PAGE_H = PAGE
LEFT = 10 * mm
RIGHT = 10 * mm
TOP = 14 * mm
BOTTOM = 14 * mm
CONTENT_W = PAGE_W - LEFT - RIGHT

NAVY = colors.HexColor("#1f2b3d")
LAVENDER = colors.HexColor("#7b5ea7")
LAVENDER_LIGHT = colors.HexColor("#f4f1fb")
TEXT = colors.HexColor("#334155")
MUTED = colors.HexColor("#718096")
GRID = colors.HexColor("#dfe5ec")
ROW_ALT = colors.HexColor("#fbfaff")
ORIGINS = {
    "hanja": ("汉", "汉字词", colors.HexColor("#6d28d9")),
    "native": ("固", "固有词", colors.HexColor("#059669")),
    "loanword": ("外", "外来词", colors.HexColor("#d97706")),
    "hybrid": ("混", "混合词", colors.HexColor("#db2777")),
    "expression": ("搭", "搭配/表达", colors.HexColor("#ea580c")),
    "grammar": ("法", "语法形式", colors.HexColor("#2563eb")),
}


def pick_font(*candidates: str) -> str:
    for candidate in candidates:
        if os.path.exists(candidate):
            return candidate
    raise FileNotFoundError(f"No usable CJK font found. Tried: {candidates}")


def register_fonts() -> tuple[str, str, str]:
    chinese = pick_font(
        r"C:\Windows\Fonts\Deng.ttf",
        r"C:\Windows\Fonts\NotoSansSC-VF.ttf",
        r"C:\Windows\Fonts\simsun.ttc",
    )
    chinese_bold = pick_font(
        r"C:\Windows\Fonts\Dengb.ttf",
        r"C:\Windows\Fonts\NotoSansSC-VF.ttf",
        chinese,
    )
    korean = pick_font(
        r"C:\Windows\Fonts\malgun.ttf",
        r"C:\Windows\Fonts\Deng.ttf",
        chinese,
    )
    pdfmetrics.registerFont(TTFont("NotoSC", chinese))
    pdfmetrics.registerFont(TTFont("NotoSC-Bold", chinese_bold))
    pdfmetrics.registerFont(TTFont("Malgun", korean))
    return "NotoSC", "NotoSC-Bold", "Malgun"


def esc(value: Any) -> str:
    return html.escape(str(value or ""), quote=True)


def mixed_font(value: Any, base_font: str | None = None) -> str:
    """Escape mixed Chinese/Korean text and switch fonts for Korean glyphs.

    The origin/pronunciation column contains Chinese explanatory text with
    Korean examples such as ``安寧 + 하다 + 敬语终结``.  The Chinese font used
    by the PDF does not contain Korean glyphs, so those runs must be rendered
    with the registered Korean font explicitly.  ``base_font`` is useful when
    the surrounding paragraph uses a different font, such as a Korean word
    cell that also contains a Chinese part-of-speech label.
    """
    text = str(value or "")
    chunks = re.split(r"([가-힣ㄱ-ㅎㅏ-ㅣ]+)", text)
    rendered: list[str] = []
    for chunk in chunks:
        if not chunk:
            continue
        escaped = esc(chunk)
        if re.fullmatch(r"[가-힣ㄱ-ㅎㅏ-ㅣ]+", chunk):
            rendered.append(f'<font name="Malgun">{escaped}</font>')
        elif base_font:
            rendered.append(f'<font name="{base_font}">{escaped}</font>')
        else:
            rendered.append(escaped)
    return "".join(rendered)


def load_payload() -> dict[str, Any]:
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"Missing dataset: {DATA_PATH}")
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def styles(fonts: tuple[str, str, str]) -> dict[str, ParagraphStyle]:
    chinese, bold, korean = fonts
    base = getSampleStyleSheet()
    return {
        "cover": ParagraphStyle(
            "cover", parent=base["Title"], fontName=bold, fontSize=28,
            leading=36, textColor=NAVY, alignment=TA_CENTER, spaceAfter=8 * mm,
        ),
        "cover_sub": ParagraphStyle(
            "cover_sub", parent=base["Normal"], fontName=chinese, fontSize=13,
            leading=20, textColor=MUTED, alignment=TA_CENTER,
        ),
        "h1": ParagraphStyle(
            "h1", parent=base["Heading1"], fontName=bold, fontSize=17,
            leading=23, textColor=NAVY, spaceBefore=4 * mm, spaceAfter=3 * mm,
        ),
        "h2": ParagraphStyle(
            "h2", parent=base["Heading2"], fontName=bold, fontSize=11,
            leading=15, textColor=LAVENDER, spaceBefore=2 * mm, spaceAfter=2 * mm,
        ),
        "body": ParagraphStyle(
            "body", parent=base["BodyText"], fontName=chinese, fontSize=9,
            leading=14, textColor=TEXT, spaceAfter=2 * mm, wordWrap="CJK",
        ),
        "small": ParagraphStyle(
            "small", parent=base["BodyText"], fontName=chinese, fontSize=7.4,
            leading=10, textColor=MUTED,
        ),
        "section": ParagraphStyle(
            "section", parent=base["Heading2"], fontName=bold, fontSize=12,
            leading=16, textColor=NAVY, spaceBefore=3 * mm, spaceAfter=2 * mm, wordWrap="CJK",
        ),
        "section_sub": ParagraphStyle(
            "section_sub", parent=base["Normal"], fontName=korean, fontSize=8,
            leading=11, textColor=MUTED, wordWrap="CJK",
        ),
        "header": ParagraphStyle(
            "header", parent=base["Normal"], fontName=bold, fontSize=8.2,
            leading=10, textColor=colors.white,
        ),
        "korean": ParagraphStyle(
            "korean", parent=base["Normal"], fontName=korean, fontSize=11,
            leading=14, textColor=NAVY, wordWrap="CJK",
        ),
        "korean_roman": ParagraphStyle(
            "korean_roman", parent=base["Normal"], fontName=chinese, fontSize=7.4,
            leading=10, textColor=MUTED,
        ),
        "cell": ParagraphStyle(
            "cell", parent=base["Normal"], fontName=chinese, fontSize=8.1,
            leading=11, textColor=TEXT, wordWrap="CJK",
        ),
        "cell_small": ParagraphStyle(
            "cell_small", parent=base["Normal"], fontName=chinese, fontSize=7.2,
            leading=9.5, textColor=MUTED, wordWrap="CJK",
        ),
        "right": ParagraphStyle(
            "right", parent=base["Normal"], fontName=chinese, fontSize=7,
            leading=9, textColor=MUTED, alignment=TA_RIGHT,
        ),
    }


def page_decorator(canvas, doc, volume_label: str) -> None:
    canvas.saveState()
    canvas.setStrokeColor(GRID)
    canvas.setLineWidth(0.4)
    canvas.line(LEFT, PAGE_H - 8 * mm, PAGE_W - RIGHT, PAGE_H - 8 * mm)
    canvas.setFont("NotoSC-Bold", 8)
    canvas.setFillColor(NAVY)
    canvas.drawString(LEFT, PAGE_H - 6 * mm, f"延世韩国语词汇手册 · {volume_label}")
    canvas.setFont("NotoSC", 7)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(PAGE_W - RIGHT, 6 * mm, f"第 {doc.page} 页")
    canvas.restoreState()


def origin_line(row: dict[str, Any], style: ParagraphStyle) -> Paragraph:
    kind = row.get("origin_type") or row.get("originType") or ""
    tag, label, color = ORIGINS.get(kind, ("?", "待核", colors.HexColor("#64748b")))
    detail = row.get("origin_detail") or row.get("originDetail") or ""
    pronunciation = row.get("pronunciation") or ""
    parts = [f'<font color="{color.hexval()}"><b>{esc(tag)} {esc(label)}</b></font>']
    if detail:
        parts.append(f'<br/><font color="#64748b">{mixed_font(detail)}</font>')
    if pronunciation:
        parts.append(f'<br/><font color="#94a3b8">发音 [{mixed_font(pronunciation)}]</font>')
    return Paragraph("".join(parts), style)


def vocabulary_table(rows: list[dict[str, Any]], styles_map: dict[str, ParagraphStyle], accent: str) -> LongTable:
    header = [
        Paragraph('<font name="Malgun">한국어</font>', styles_map["header"]),
        Paragraph("中文", styles_map["header"]),
        Paragraph("English", styles_map["header"]),
        Paragraph("词源 / 发音", styles_map["header"]),
    ]
    data: list[list[Any]] = [header]
    for row in rows:
        korean = esc(row.get("korean"))
        pos = esc(row.get("pos_zh") or row.get("posZh") or row.get("pos") or "-")
        roman = esc(row.get("romanization"))
        pos_markup = mixed_font(pos, base_font="NotoSC")
        korean_cell = Paragraph(
            f"<font name=\"Malgun\"><b>{korean}</b></font>  <font size=\"7\" color=\"#64748b\">[{pos_markup}]</font>"
            f"<br/><font name=\"NotoSC\" size=\"7.4\" color=\"#94a3b8\">{roman}</font>",
            styles_map["korean"],
        )
        data.append([
            korean_cell,
            Paragraph(mixed_font(row.get("chinese") or "-"), styles_map["cell"]),
            Paragraph(mixed_font(row.get("english") or "-"), styles_map["cell"]),
            origin_line(row, styles_map["cell"]),
        ])

    table = LongTable(
        data,
        # A4 竖版仍保留工作台的四列结构；词源列略加宽，避免发音提示和词源详情拥挤。
        colWidths=[CONTENT_W * 0.26, CONTENT_W * 0.20, CONTENT_W * 0.25, CONTENT_W * 0.29],
        repeatRows=1,
        splitByRow=1,
        hAlign="LEFT",
    )
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("GRID", (0, 0), (-1, -1), 0.35, GRID),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, ROW_ALT]),
        ("LEFTPADDING", (0, 0), (-1, -1), 3.2 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3.2 * mm),
        ("TOPPADDING", (0, 0), (-1, 0), 2.3 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 2.3 * mm),
        ("TOPPADDING", (0, 1), (-1, -1), 1.75 * mm),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 1.75 * mm),
        ("LINEBEFORE", (0, 1), (0, -1), 1.4, colors.HexColor(accent)),
    ]))
    return table


def section_block(
    volume: int,
    chapter: dict[str, Any],
    unit: int,
    rows: list[dict[str, Any]],
    styles_map: dict[str, ParagraphStyle],
    accent: str,
) -> list[Any]:
    title = f"第{volume}册-第{chapter['chapter']}课-第{unit}单元"
    heading = Table([
        [
            Paragraph(f"<b>{esc(title)}</b>", styles_map["section"]),
            Paragraph(f"{esc(chapter['ko'])} · {esc(chapter['en'])}", styles_map["section_sub"]),
            Paragraph(f"{len(rows)} 条", styles_map["right"]),
        ]
    ], colWidths=[CONTENT_W * 0.38, CONTENT_W * 0.52, CONTENT_W * 0.10])
    heading.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LAVENDER_LIGHT),
        ("LINEBEFORE", (0, 0), (0, 0), 2.4, colors.HexColor(accent)),
        ("BOX", (0, 0), (-1, -1), 0.35, GRID),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 1.3 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.3 * mm),
    ]))
    return [KeepTogether([heading, Spacer(1, 1.2 * mm)]), vocabulary_table(rows, styles_map, accent), Spacer(1, 3.5 * mm)]


def cover(volume: dict[str, Any], row_count: int, styles_map: dict[str, ParagraphStyle]) -> list[Any]:
    return [
        Spacer(1, 32 * mm),
        Paragraph("延世韩国语词汇手册", styles_map["cover"]),
        Paragraph(f"第 {volume['volume']} 册", styles_map["cover_sub"]),
        Spacer(1, 8 * mm),
        Paragraph("中韩英对照 · 罗马音 · 词源 / 发音", styles_map["cover_sub"]),
        Paragraph(f"按教材册次、课次、单元和原始顺序整理 · 共 {row_count} 条", styles_map["cover_sub"]),
        Spacer(1, 16 * mm),
        Paragraph("A4 竖版工作台打印版 · Open Yonsei Korean Vocabulary", styles_map["cover_sub"]),
        PageBreak(),
        Paragraph("使用说明", styles_map["h1"]),
        Paragraph(
            "本册按照教材原始顺序排列。每个单元前均标注“第N册-第N课-第N单元”，韩语下方为罗马音，右侧保留词源类型、词源详情和必要的韩文发音提示。A4 竖版保留工作台的韩语、中文、English、词源/发音四列结构，PDF 为可搜索文字，适合打印、划线和背诵。",
            styles_map["body"],
        ),
        Paragraph("字段说明", styles_map["h2"]),
        Paragraph("汉：汉字词　固：固有词　外：外来词　混：混合词　搭：搭配/表达　法：语法形式", styles_map["body"]),
        Paragraph("资料来源与许可", styles_map["h2"]),
        Paragraph(
            "词汇数据来自 Open Yonsei Korean Vocabulary 开源项目。本项目为独立维护的学习资料，并非延世大学或延世大学韩国语学堂官方教材。数据及数据生成物的再分发请遵守原仓库 LICENSE.md、SOURCES.md 和第三方来源条款。",
            styles_map["body"],
        ),
        PageBreak(),
    ]


def build_pdf(payload: dict[str, Any], volume_number: int | None, output_path: Path, combined: bool = False) -> dict[str, Any]:
    fonts = register_fonts()
    styles_map = styles(fonts)
    all_volumes = payload["volumes"] if volume_number is None else [v for v in payload["volumes"] if v["volume"] == volume_number]
    if not all_volumes:
        raise ValueError(f"Volume not found: {volume_number}")
    rows_by_volume = Counter()
    for row in payload["rows"]:
        rows_by_volume[row["volume"]] += 1

    doc = BaseDocTemplate(
        str(output_path), pagesize=PAGE,
        leftMargin=LEFT, rightMargin=RIGHT, topMargin=TOP, bottomMargin=BOTTOM,
        title="延世韩国语词汇手册",
        author="Lavender Study",
    )
    frame = Frame(LEFT, BOTTOM, CONTENT_W, PAGE_H - TOP - BOTTOM, id="normal")
    doc.addPageTemplates([PageTemplate(id="yonsei", frames=[frame], onPage=lambda canvas, page_doc: page_decorator(canvas, page_doc, "六册合订版" if combined else f"第{all_volumes[0]['volume']}册"))])

    story: list[Any] = []
    for volume_index, volume in enumerate(all_volumes):
        if volume_index:
            story.append(PageBreak())
        volume_rows = [row for row in payload["rows"] if row["volume"] == volume["volume"]]
        story.extend(cover(volume, len(volume_rows), styles_map))
        rows_by_section: dict[tuple[int, int], list[dict[str, Any]]] = {}
        for row in volume_rows:
            rows_by_section.setdefault((row["chapter"], row["unit"]), []).append(row)
        for chapter in volume["chapters"]:
            for unit in range(1, int(volume["unitsPerChapter"]) + 1):
                section_rows = rows_by_section.get((chapter["chapter"], unit), [])
                if not section_rows:
                    continue
                story.extend(section_block(volume["volume"], chapter, unit, section_rows, styles_map, volume["accent"] or "#7B5EA7"))
        story.append(Paragraph("来源与版本", styles_map["h1"]))
        story.append(Paragraph(
            f"本册共 {len(volume_rows)} 条教材词汇记录，生成自版本 {esc(payload.get('projectVersion', ''))} 的教材明细数据。源项目：https://github.com/Amulopapa67/open-yonsei-korean-vocabulary",
            styles_map["body"],
        ))
        story.append(Paragraph("如需制作个人卡片、音频或衍生教材，请保留来源、许可和修改说明，并自行核对低置信度词条。", styles_map["body"]))

    output_path.parent.mkdir(parents=True, exist_ok=True)
    doc.build(story)
    return {
        "output": str(output_path),
        "volumes": [v["volume"] for v in all_volumes],
        "rows": sum(rows_by_volume[v["volume"]] for v in all_volumes),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--volume", type=int, action="append", help="Generate the selected volume(s).")
    parser.add_argument("--combined", action="store_true", help="Generate a six-volume combined PDF.")
    parser.add_argument("--output-dir", type=Path, default=OUTPUT_DIR)
    args = parser.parse_args()
    payload = load_payload()
    args.output_dir.mkdir(parents=True, exist_ok=True)

    results = []
    if args.combined:
        results.append(build_pdf(payload, None, args.output_dir / "延世韩国语词汇手册-六册合订版.pdf", combined=True))
    else:
        volumes = args.volume or list(range(1, 7))
        for volume in volumes:
            results.append(build_pdf(payload, volume, args.output_dir / f"延世韩国语词汇手册-第{volume}册.pdf"))
    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
