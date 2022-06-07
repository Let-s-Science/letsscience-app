import TreeSegment from "./tree_segment"
import ShootApicalMeristem from "./shoot_apical_meristem"

class AxillaryBud {
  constructor (attachAngle, segment) {
    this.attachAngle = attachAngle
    this.segment = segment
    this.counter = 0
  }

  tick (tree) {
    if (this.segment.auxinLevel < 0.1) {
      this.startShoot(tree)
    }
    this.counter++
  }

  startShoot (tree) {
    const branch = new TreeSegment(this.attachAngle, this.segment)
    const meristem = new ShootApicalMeristem(branch)
    tree.addApicalMeristem(meristem)
    this.segment.bud = null
  }

  draw (p5) {
    p5.noStroke()
    p5.fill(200, 210, 120)
    p5.ellipse(0, 0, 5, 5)
  }
}

export default AxillaryBud
