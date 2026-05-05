import { Div } from "../atoms/atoms.js"
import { Card } from "../molecules/card.js"

export const Board = (
    faceSrcs: string[],
    backSrc: string,
    onCardClick: (element: HTMLElement, faceSrc: string) => void
) => {
    const element = Div("board grid grid-cols-5 gap-2 p-4 max-w-3xl mx-auto")

    faceSrcs.forEach(faceSrc => {
        const card = Card(faceSrc, backSrc, onCardClick)
        element.appendChild(card)
    })

    return element
}
