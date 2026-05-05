import { Div } from "../atoms/atoms.js"

export const Card = (
    faceSrc: string,
    backSrc: string,
    onClick: (element: HTMLElement, faceSrc: string) => void
) => {
    const element = Div("card relative aspect-square cursor-pointer perspective-[1000px]")

    const inner = Div("relative w-full h-full transition-transform duration-500 transform-3d in-[.flipped]:rotate-y-180")

    const back = document.createElement("img")
    back.src = backSrc
    back.className = "card-back absolute inset-0 w-full h-full object-cover rounded backface-hidden"

    const face = document.createElement("img")
    face.src = faceSrc
    face.className = "card-face absolute inset-0 w-full h-full object-cover rounded backface-hidden rotate-y-180"

    inner.appendChild(back)
    inner.appendChild(face)
    element.appendChild(inner)

    element.addEventListener("click", () => onClick(element, faceSrc))

    return element
}
