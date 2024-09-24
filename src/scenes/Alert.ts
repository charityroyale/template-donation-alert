import { Scene } from 'phaser'

export class Alert extends Scene {
	constructor() {
		super('Alert')
	}

	preload() {
		this.load.image('blueStarTexture', 'assets/blue_star.png')
		this.load.audio('explo1Sfx', 'assets/fireworks_sound_1.mp3')
		this.load.audio('explo2Sfx', 'assets/fireworks_sound_2.mp3')
	}

	playAlert() {
		/**
		 * This an example alert. You are absolutely free to use particles, spritesheets, sound-effects.
		 * Please keep in mind that any assets used MUST be licensed to be used freely for the charity event.
		 */
		this.time.addEvent({
			repeat: 4,
			delay: 1500,
			startAt: 1400,
			callback: () => {
				// Inspired by https://codepen.io/samme/pen/eYEearb @sammee on github
				const fireworksEmitter = this.add.particles(0, 0, 'blueStarTexture', {
					alpha: { start: 1, end: 0, ease: 'Cubic.easeIn' },
					angle: { start: 0, end: 360, steps: 100 },
					blendMode: 'ADD',
					frequency: 1000,
					gravityY: 600,
					lifespan: 1800,
					quantity: 500,
					reserve: 500,
					scale: { min: 0.02, max: 0.35 },
					speed: { min: 200, max: 600 },
					emitting: false,
				})
				fireworksEmitter.setPosition(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 400))
				fireworksEmitter.explode()
				this.sound.play(Phaser.Math.Between(0, 1) > 0 ? 'explo1Sfx' : 'explo2Sfx')
			},
		})
	}

	create() {
		this.add.text(300, 300, 'Click to play alert')
		this.input.on('pointerdown', () => this.playAlert())
	}

	update(_time: number) {
		/* How _time flies! */
	}
}
