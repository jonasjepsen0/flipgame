import { Div, Button, H1, Paragraph } from "../atoms/atoms.js"

export const WinPopup = (time: string, moves: number, onRestart: () => void) => {
    const overlay = Div("fixed inset-0 bg-black/60 flex items-center justify-center z-50")

    const card = Div("bg-white rounded-lg p-8 text-center shadow-lg")

    const title = H1("text-3xl font-bold mb-4")
    title.textContent = "Du vandt"

    const timeStat = Paragraph("text-lg")
    timeStat.textContent = `Tid: ${time}`

    const movesStat = Paragraph("text-lg mb-6")
    movesStat.textContent = `Træk: ${moves}`

    const button = Button("px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer")
    button.textContent = "Spil igen"
    button.addEventListener("click", onRestart)

    card.appendChild(title)
    card.appendChild(timeStat)
    card.appendChild(movesStat)
    card.appendChild(button)
    overlay.appendChild(card)

    return overlay
}