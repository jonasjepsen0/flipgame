import { Paragraph } from "../atoms/atoms.js"

export const Timer = () => {
    const element = Paragraph("timer text-2xl text-center font-mono py-4")
    element.textContent = "0:00"
    return element
}