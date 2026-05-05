import { Div } from "../atoms/atoms.js"

export const Card = (faceSrc: string, backSrc: string, onClick: () => void) => {
    const element = Div("card relative aspect-square cursor-pointer")

    const back = document.createElement("img")
    back.src = backSrc
    back.className = "card-back absolute inset-0 w-full h-full object-cover rounded"

    const face = document.createElement("img")
    face.src = faceSrc
    face.className = "card-face absolute inset-0 w-full h-full object-cover rounded"

    element.appendChild(back)
    element.appendChild(face)

    element.addEventListener("click", onClick)

    return element
}