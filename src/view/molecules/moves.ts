import { Paragraph } from "../atoms/atoms.js"

export const Moves = () => {
    const element = Paragraph("moves text-2xl text-center font-mono")
    element.textContent = "Moves: 0"
    return element
}