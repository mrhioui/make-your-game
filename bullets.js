import { ctx } from "./main"

class Bullet {
    constructor(position, speed) {
        this.position = position
        this.speed = speed
        this.radius = 3
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath
    }
    update() {
        this.position.x = this.speed.x
        this.position.y = this.speed.y
    }
}