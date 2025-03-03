import { frame, warShip, bullets } from "./main.js"

export { controlsSetup }

const controlsSetup = (keys) => {
    document.addEventListener("keydown", handleKeyEvent)
    document.addEventListener("keyup", handleKeyEvent)

    function handleKeyEvent(event) {
        const isKeyDown = event.type === "keydown"

        switch (event.code) {
            case "KeyP":
                if (isKeyDown) console.log("Pause")
                break

            case "KeyR":
                if (isKeyDown) console.log("Restart")
                break

            case "Enter":
                if (isKeyDown) console.log("Continue")
                break

            case "KeyA":
            case "ArrowLeft":
                keys.left = isKeyDown
                console.log("Move Left")
                break

            case "KeyS":
            case "ArrowRight":
                keys.right = isKeyDown
                console.log("Move Right")
                break

            case "Space":
                keys.shoot = isKeyDown
                console.log("Shoot")

                if (isKeyDown) {
                    const bullet = {
                        htmlElem: document.createElement("img"),
                        width: 22,
                        height: 22,
                        position: {
                            x: warShip.position.x + 13,
                            y: warShip.position.y + 20,
                        },
                        speedY: -5,
                    }
                    bullet.htmlElem.src = "/imgs/bullet.png"
                    bullet.htmlElem.classList.add("bullet")
                    frame.htmlElem.appendChild(bullet.htmlElem)
                    bullets.push(bullet)
                    console.log(bullet)
                }
                break

            default:
                console.log(event.code)
                break
        }
    }
}
