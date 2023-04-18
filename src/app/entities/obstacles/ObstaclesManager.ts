import { Game } from "../../core/Game";
import { Obstacle } from "./Obstacle";


interface GeneratorRule { probability: number, firedAt?: number };

export class ObstaclesManager {
  private readonly game = Game.getInstance();
  private generatorRules: Map<number, GeneratorRule[]> = new Map();

  constructor() { }

  public addRule(distance: number, rule: GeneratorRule) {
    const existingRule = this.generatorRules.get(distance);

    if (existingRule) {
      existingRule.push(rule);
    } else {
      this.generatorRules.set(distance, [rule]);
    }
  }

  public setObstacles(obstacles: Obstacle[]): void {
    const distanceWalked = this.game.distanceWalked;

    this.generatorRules.forEach((rules, distance) => {
      console.log(distanceWalked % 1)
      if (distanceWalked > 0 && distanceWalked % distance <= .25) {
        rules.filter(({ firedAt }) => distanceWalked - (firedAt || 0) > .25).forEach((rule) => {
          const rand = Math.random();
          if (rule.probability >= rand) {
            obstacles.push(new Obstacle([this.game.canvas.width, this.game.canvas.height - this.game.ground.height - 96]));
          }
          rule.firedAt = distanceWalked;
        });
      }
    });
  }

}