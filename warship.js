import { frame, ctx } from "./main.js"
export { warShip }

class Warship {
    constructor() {

        this.image = new Image()
        this.image.src = './imgs/warship.png'
        this.image.onload = () => {
            this.width = this.image.width
            this.height = this.image.height
            this.position = {
                x: frame.width / 2 - this.width / 2,
                y: frame.height - this.height - 15
            }
        }
        this.speedX = 0
    }

    draw() {
        if (this.image) ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
    move() {
        if (this.position) {
            this.draw()
            this.position.x += this.speedX
        }
    }
}

const warShip = new Warship()
