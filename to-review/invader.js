// import { ctx } from "./main.js"
export { Invader }

class Invader {
    constructor(position) {
      this.position = position; // Initialize position immediately
      this.width = 30; // Default width (adjust to match your image)
      this.height = 30; // Default height (adjust to match your image)
      
      this.image = new Image();
      this.image.src = './imgs/invader.png';
      this.image.onload = () => {
        // Update dimensions after image loads
        this.width = this.image.width;
        this.height = this.image.height;
      };
  
      this.speed = { x: 2, y: 0 };
    }
  
    draw() {
      // Now position/width/height are always defined
      ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
  
    move() {
      this.draw();
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;
    }
  }

// const invader = new Invader({
//     x: 15,
//     y: 0
// })


