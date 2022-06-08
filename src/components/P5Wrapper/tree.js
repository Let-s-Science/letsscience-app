import TreeSegment from "./tree_segment"
import ShootApicalMeristem from "./shoot_apical_meristem"

class Tree {
  constructor (x, y, p5) {
    this.x = x
    this.y = y

    this.segments = []
    const firstShoot = new TreeSegment(-Math.PI / 2, this)

    this.apicalMeristems = []
    this.apicalMeristems.push(new ShootApicalMeristem(firstShoot))
  }

  addApicalMeristem (apicalMeristem) {
    this.apicalMeristems.push(apicalMeristem)
  }

  addChildSegment (segment) {
    this.segments.push(segment)
  }

  receiveAuxin (auxin) {
    // do nothing
  }

  tick (p5) {
    this.apicalMeristems.forEach(s => s.tick(this, p5))
    this.segments.forEach(s => s.tick(this))
  }

  draw (p5) {
    this.segments.forEach(s => s.draw(p5))
  }
}

export default Tree;
