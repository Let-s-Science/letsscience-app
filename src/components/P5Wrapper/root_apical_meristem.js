import ApicalMeristem from "./apical_meristem"
import TreeSegment from "./tree_segment"

class RootApicalMeristem extends ApicalMeristem {
  constructor (segment) {
    super(segment)
    this.attachAngle = Math.PI / 2.2
    this.direction = RootApicalMeristem.DIRECTION_DOWN
  }

  static get DIRECTION_DOWN () { return 0 }
  static get DIRECTION_LEFT () { return 1 }
  static get DIRECTION_RIGHT () { return 2 }

  addBranch (tree, p5) {
    const chanceNoBranch = p5.random()
    if (chanceNoBranch < 0.4) {
      return
    }

    const branch = new TreeSegment(this.attachAngle * this.attachDir, this.segment)
    const meristem = this.meristemOfSameType(branch)

    if (this.direction == RootApicalMeristem.DIRECTION_DOWN) {
      if (this.attachDir > 0) {
        meristem.direction = RootApicalMeristem.DIRECTION_RIGHT
        meristem.attachDir = -1
      } else {
        meristem.direction = RootApicalMeristem.DIRECTION_LEFT
        meristem.attachDir = 1
      }
      this.attachDir *= -1
    }
    tree.addApicalMeristem(meristem)
  }

  startNewSegment (p5) {
    const angleRange = p5.random(-0.1, 0.1) * this.attachDir
    const childSeg = new TreeSegment(angleRange, this.segment)
    this.segment.attachToSegment
    this.attachToSegment(childSeg)
  }

  meristemOfSameType (segment) {
    return new RootApicalMeristem(segment)
  }
}

export default RootApicalMeristem
