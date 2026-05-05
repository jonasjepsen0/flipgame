import { Board } from '../view/organisms/board.js'
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

    start(targetId: string) {
        const deck = this.buildDeck()
        const board = Board(deck, back, (element, faceSrc) => this.onCardClick(element, faceSrc))
        render(targetId, board, true)
    }

    private buildDeck() {
        const deck = [...this.faces, ...this.faces]
        deck.sort(() => Math.random() - 0.5)
        return deck
    }

    private onCardClick(element: HTMLElement, faceSrc: string) {
        if (this.locked) return
        if (element.classList.contains("flipped")) return

        element.classList.add("flipped")

        if (this.firstCard === null) {
            this.firstCard = { element, faceSrc }
            return
        }

        const first = this.firstCard
        this.firstCard = null

        if (first.faceSrc === faceSrc) {
            return
        }

        this.locked = true
        setTimeout(() => {
            first.element.classList.remove("flipped")
            element.classList.remove("flipped")
            this.locked = false
        }, 800)
    }
}
