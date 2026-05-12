import { Board } from '../view/organisms/board.js'
import { Timer } from '../view/molecules/timer.js'
import { Moves } from '../view/molecules/moves.js'
import { WinPopup } from '../view/molecules/winPopup.js'
import { Scoreboard } from '../view/molecules/scoreboard.js'
import { Div } from '../view/atoms/atoms.js'
import { getScores, addScore } from '../model/scoreboardModel.js'
import { render } from '../utils/dom.js'

import tile0 from '../assets/faces/tile0.jpg'
import tile1 from '../assets/faces/tile1.jpg'
import tile2 from '../assets/faces/tile2.jpg'
import tile3 from '../assets/faces/tile3.jpg'
import tile4 from '../assets/faces/tile4.jpg'
import tile5 from '../assets/faces/tile5.jpg'
import tile6 from '../assets/faces/tile6.jpg'
import tile7 from '../assets/faces/tile7.jpg'
import tile8 from '../assets/faces/tile8.jpg'
import tile9 from '../assets/faces/tile9.jpg'
import back from '../assets/cardbg/bonfire.png'

export class GameController {
    private faces = [tile0, tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9]
    private firstCard: { element: HTMLElement, faceSrc: string } | null = null
    private locked = false

    private timerElement = Timer()
    private startTime: number | null = null
    private timerInterval: number | null = null
    private matchedPairs = 0

    private movesElement = Moves()
    private moveCount = 0

    private targetId = ""

    start(targetId: string) {
        this.targetId = targetId

        this.firstCard = null
        this.locked = false
        this.matchedPairs = 0
        this.moveCount = 0
        this.startTime = null
        if (this.timerInterval !== null) {
            clearInterval(this.timerInterval)
            this.timerInterval = null
        }
        this.timerElement.textContent = "0:00"
        this.timerElement.classList.remove("text-green-500", "font-bold")
        this.movesElement.textContent = "Moves: 0"

        const deck = this.buildDeck()
        const board = Board(deck, back, (element, faceSrc) => this.onCardClick(element, faceSrc))
        const scoreboardEl = Scoreboard(getScores())

        const row = Div("grid grid-cols-[1fr_auto] gap-8 items-start max-w-7xl mx-auto p-4")
        row.appendChild(board)
        row.appendChild(scoreboardEl)

        render(targetId, row, true)
        render(targetId, this.timerElement)
        render(targetId, this.movesElement)
    }

    private buildDeck() {
        const deck = [...this.faces, ...this.faces]
        deck.sort(() => Math.random() - 0.5)
        return deck
    }

    private onCardClick(element: HTMLElement, faceSrc: string) {
        if (this.locked) return
        if (element.classList.contains("flipped")) return

        if (this.startTime === null) this.startTimer()

        element.classList.add("flipped")

        if (this.firstCard === null) {
            this.firstCard = { element, faceSrc }
            return
        }

        const first = this.firstCard
        this.firstCard = null

        this.moveCount++
        this.updateMoves()

        if (first.faceSrc === faceSrc) {
            this.matchedPairs++
            if (this.matchedPairs === this.faces.length) {
                this.stopTimer()
                this.showWinPopup()
            }
            return
        }

        this.locked = true
        setTimeout(() => {
            first.element.classList.remove("flipped")
            element.classList.remove("flipped")
            this.locked = false
        }, 800)
    }

    private startTimer() {
        this.startTime = Date.now()
        this.timerInterval = window.setInterval(() => this.updateTimer(), 200)
    }

    private stopTimer() {
        if (this.timerInterval !== null) {
            clearInterval(this.timerInterval)
            this.timerInterval = null
        }
        this.timerElement.classList.add("text-green-500", "font-bold")
    }

    private updateTimer() {
        if (this.startTime === null) return
        const elapsed = Date.now() - this.startTime
        this.timerElement.textContent = this.formatTime(elapsed)
    }

    private formatTime(ms: number): string {
        const totalSeconds = Math.floor(ms / 1000)
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    private updateMoves() {
        this.movesElement.textContent = `Moves: ${this.moveCount}`
    }

    private showWinPopup() {
        addScore("player", this.moveCount)
        const popup = WinPopup(
            this.timerElement.textContent ?? "0:00",
            this.moveCount,
            () => this.start(this.targetId)
        )
        render(this.targetId, popup)
    }
}