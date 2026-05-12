export interface ScoreEntry {
    rank: number
    name: string
    score: number
}

export function getScores(): ScoreEntry[] {
    return JSON.parse(localStorage.getItem("highscores") ?? "[]") as ScoreEntry[]
}

export function addScore(name: string, score: number): void {
    const scores = getScores()
    scores.push({ rank: 0, name, score })
    scores.sort((a, b) => a.score - b.score)
    scores.forEach((s, i) => s.rank = i + 1)
    localStorage.setItem("highscores", JSON.stringify(scores.slice(0, 10)))
}
