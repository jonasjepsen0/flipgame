import { Div } from "../atoms/atoms.js"
import { Card } from "../molecules/card.js"

export const Board = (
    faceSrcs: string[],
    backSrc: string,
    onCardClick: (faceSrc: string) => void
) => {
    const element = Div("board grid grid-cols-4 gap-2 p-4 max-w-2xl mx-auto")

    faceSrcs.forEach(faceSrc => {
        const card = Card(faceSrc, backSrc, () => onCardClick(faceSrc))
        element.appendChild(card)
    })

    return element
}

