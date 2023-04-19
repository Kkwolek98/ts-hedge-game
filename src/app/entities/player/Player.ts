import { KeyboardInput } from "../../core/KeyboardInput";
import { PhysicsObject } from "../../core/Physics";
import { GRAVITY, SCROLL_POSITION } from "../../core/utils/settings";
import { Sprite } from "../../core/Sprite";
import { SpriteManager } from "../../core/SpriteManager";
import { Obstacle } from "../obstacles/Obstacle";
import { jumpVelocityByHeight } from "../../core/utils/jumpUtils";

const SPRITE_NAME = 'hedgehog-sprite'

export class Player extends PhysicsObject {
  private sprite: Sprite;
  private flipped: boolean = false;

  constructor() {
    const spriteData = SpriteManager.sprites.get(SPRITE_NAME)!;
    const sprite = new Sprite(spriteData);
    super(sprite);

    this.sprite = sprite;
  }

  public override update() {
    this.sprite.update();
    this.handlePhysics();
    this.handleInput();


    if (this.position[0] <= SCROLL_POSITION * this.game.canvas.width || this.velocityX <= 0) {
      this.position[0] += this.velocityX;
    }
    this.position[1] += this.velocityY;

    this.game.distanceWalked += this.velocityX / 1000; // 1000px = 1m;

    this.draw();
  }

  protected override draw() {
    const { frame } = this.sprite.getCurrentFrameData();

    if (this.flipped) {
      // draw flipped sprite
      this.game.ctx.save();
      this.game.ctx.translate(this.game.canvas.width, 0);
      this.game.ctx.scale(-1, 1);
      this.game.ctx.drawImage(this.sprite.image, frame.x, frame.y, frame.w, frame.h, this.game.canvas.width - frame.w - this.position[0], this.position[1], frame.w, frame.h);
      this.game.ctx.restore();
    } else {
      this.game.ctx.drawImage(this.sprite.image, frame.x + 1, frame.y, frame.w - 1, frame.h, this.position[0], this.position[1], frame.w, frame.h);
    }
  }

  private handleInput(): void {
    if (KeyboardInput.isHeld('KeyD')) {
      const collision = this.calculateCollision(Math.min(this.maxVelocityX, this.velocityX + .5), this.velocityY - GRAVITY);
      if (collision) {
        this.velocityX = 0;
      } else {
        this.handleRightMovement();
      }
    } else if (KeyboardInput.isHeld('KeyA')) {
      const collision = this.calculateCollision(Math.max(-this.maxVelocityX, this.velocityX - .5), this.velocityY - GRAVITY);
      if (collision) {
        this.velocityX = 0;
      } else {
        this.handleLeftMovement();
      }
    } else {
      this.handleStop();
    }

    if (KeyboardInput.isHeld('space') && !this.jumpsPerformed) {
      this.velocityY = jumpVelocityByHeight(192);
      this.jumpsPerformed++;
    } else if (this.jumpsPerformed && this.velocityY < -1 && !KeyboardInput.isHeld('space')) {
      this.velocityY = this.velocityY / 2;
    }
  }

  private handleLeftMovement(): void {
    this.flipped = true;

    if (this.position[0] < 0) {
      this.velocityX = 0;
    } else {
      this.velocityX = Math.max(-this.maxVelocityX, this.velocityX - .5);
    }
  }

  private handleRightMovement(): void {
    this.flipped = false;
    this.velocityX = Math.min(this.maxVelocityX, this.velocityX + .5);
  }

  private handleStop(): void {
    this.velocityX += -(this.velocityX / 10)
    if (
      Math.abs(this.velocityX) > 0 &&
      Math.abs(this.velocityX) < 0.25
    ) {
      this.velocityX = 0;
    }
  }

  private calculateCollision(currentVelocityX: number, currentVelocityY: number): boolean {
    const checkNearby = (obstacle: Obstacle) => obstacle.position[0] < this.position[0] + 300 && obstacle.position[0] > this.position[0] - 300;
    const objectsNearby: Obstacle[] = this.game.obstacles.filter(checkNearby);

    let isColliding = false;

    const playerHitbox = {
      x: this.position[0],
      y: this.position[1],
      width: this.sprite.dimensions.w,
      height: this.sprite.dimensions.h
    };

    const velocitySteps = 5; // number of steps to check for collision
    const velocityStepX = currentVelocityX / velocitySteps;
    const velocityStepY = currentVelocityY / velocitySteps;

    for (let i = 0; i < velocitySteps; i++) {
      playerHitbox.x += velocityStepX;
      playerHitbox.y += velocityStepY;

      let obstacleHitbox: { x: any; width: any; y: any; height: any; };

      const checkCollision = (obstacle: Obstacle) => {
        // Determine the coordinates of the obstacle's hitbox
        obstacleHitbox = {
          x: obstacle.position[0] - (this.game.isScrolling() ? velocityStepX * i : 0),
          y: obstacle.position[1],
          width: 96,
          height: 96
        };


        // Check for collision between the player's hitbox at the current position and the obstacle's hitbox
        const collides = !(
          playerHitbox.x + playerHitbox.width < obstacleHitbox.x ||
          playerHitbox.x > obstacleHitbox.x + obstacleHitbox.width ||
          playerHitbox.y + playerHitbox.height < obstacleHitbox.y ||
          playerHitbox.y > obstacleHitbox.y + obstacleHitbox.height
        );

        if (collides) console.log(this.game.isScrolling(currentVelocityX))
        isColliding = isColliding || collides;
      }

      objectsNearby.forEach(checkCollision);

      if (isColliding) {
        this.position[0] = obstacleHitbox!.x - obstacleHitbox!.width;
        break
      }; // no need to check further if collision occurred
    }

    if (isColliding) this.game.start();

    return isColliding;
  }

}