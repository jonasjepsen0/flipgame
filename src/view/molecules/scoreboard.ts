import { Div, Paragraph } from "../atoms/atoms.js"
import type { ScoreEntry } from "../../model/scoreboardModel.js"

export const Scoreboard = (scores: ScoreEntry[] = []) => {
    const element = Div("bg-black/80 rounded-lg p-10 text-center shadow-lg")

    const title = Paragraph("text-white text-xl font-bold mb-4 tracking-widest uppercase")
    title.textContent = "High Scores"

    const list = Div("flex flex-col gap-2")

    scores
        .slice()
        .sort((a, b) => a.score - b.score)
        .slice(0, 10)
        .forEach(({ rank, name, score }) => {
            const row = Div("flex justify-between text-white text-sm font-mono px-2 py-1 border-b border-white/10")

            const rankEl = Paragraph("w-6 text-white/40")
            rankEl.textContent = `${rank}.`

            const nameEl = Paragraph("flex-1 text-left")
            nameEl.textContent = name

            const scoreEl = Paragraph("text-right tabular-nums")
            scoreEl.textContent = score.toLocaleString()

            row.append(rankEl, nameEl, scoreEl)
            list.appendChild(row)
        })

    element.append(title, list)
    return element
}
