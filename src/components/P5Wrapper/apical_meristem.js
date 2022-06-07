import TreeSegment from "./tree_segment"

class ApicalMeristem {
  constructor (segment) {
    this.segment = null
    this.attachToSegment(segment)
    this.attachDir = 1
    this.attachAngle = Math.PI / 8
  }

  attachToSegment (segment) {
    if (this.segment) {
      this.segment.disassociateFromAM()
    }
    this.segment = segment
    this.segment.attachAM(this)
  }

  tick (tree, p5) {
    if (p5.frameCount % 200 == 0) {
      this.addBranch(tree, p5)
      this.startNewSegment(p5)
    }

    // this.extendSegment();
    this.transmitAuxin()
    if (this.segment.length > TreeSegment.MAX_LENGTH) {
      this.startNewSegment(p5)
    }
  }

  addBranch () {
    const branch = new TreeSegment(this.attachAngle * this.attachDir, this.segment)
    const meristem = this.meristemOfSameType(branch)
    tree.addApicalMeristem(meristem)
    this.attachDir *= -1
  }

  transmitAuxin () {
    this.segment.receiveAuxin(1)
  }

  extendSegment () {
    this.segment.lengthen(0.2)
  }

  startNewSegment (p5) {
    const angleRange = p5.random(-0.4, 0.4) * this.attachDir
    const childSeg = new TreeSegment(angleRange, this.segment)
    this.segment.attachToSegment
    this.attachToSegment(childSeg)
  }

  draw (p5) {
    p5.noStroke()
    p5.fill(160, 230, 80)
    p5.ellipse(0, 0, 5, 5)
  }
}

export default ApicalMeristem
