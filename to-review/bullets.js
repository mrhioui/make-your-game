// // import { ctx } from "./main.js"
// export { Bullet }

// class Bullet {
//     constructor(position, speed) {
//         this.position = position
//         this.speedY = speed

//         this.image = new Image()
//         this.image.src = './imgs/bullet.png'

//         this.image.onload = () => {
//             this.width = this.image.width
//             this.height = this.image.height
//         }
//     }

//     draw() {
//         if (this.image) ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
//     }

//     move() {
//         this.draw()
//         this.position.y += this.speedY
//     }
// }

