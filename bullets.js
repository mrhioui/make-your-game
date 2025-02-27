import { ctx } from "./main.js"
export { Bullet }

class Bullet {
    constructor({ position, speed }) {
        this.position = position
        this.speed = speed

        this.image = new Image();
        this.image.src = './imgs/bullet.png';

        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
        };
    }

    draw() {
        if (this.image) {
            console.log('draw bullet');
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
    }

    move() {
        console.log('move bullet');

        if (this.position && this.speed && this.position.x !== undefined && this.speed.x !== undefined) {
            this.draw();
            this.position.x += this.speed.x;
            this.position.y += this.speed.y;
        } else {
            console.error('Bullet position or speed is undefined');
        }
    }
}




function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}
