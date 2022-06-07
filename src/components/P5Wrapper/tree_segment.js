class TreeSegment {
  constructor (attachAngle, parent, p5) {
    this.attachAngle = attachAngle
    this.length = 0
    this.width = 0.25
    this.apicalMeristem = null
    this.childSegments = null

    this.parent = parent
    this.parent.addChildSegment(this)
    this.leaves = []
    this.bud = null
    this.auxinLevel = 0
    this.p5 = p5;
  }

  static get MAX_LENGTH () { return 20 } // Purely in terms of data modeling

  attachAM (apicalMeristem) {
    this.apicalMeristem = apicalMeristem
  }

  disassociateFromAM () {
    this.apicalMeristem = null
  }

  attachLeaf (leaf) {
    this.leaves.push(leaf)
  }

  addChildSegment (segment) {
    if (this.childSegments === null) {
      this.childSegments = []
    }
    this.childSegments.push(segment)
  }

  receiveAuxin (auxin) {
    this.auxinLevel = Math.min(this.auxinLevel + auxin, 1)
  }

  transmitAuxin () {
    if (this.auxinLevel == 0) {
      return
    }

    const auxinAmt = 0.15 * this.auxinLevel
    this.auxinLevel -= auxinAmt
    if (this.auxinLevel < 0.05) {
      this.auxinLevel = 0
    }
    this.parent.receiveAuxin(auxinAmt)
  }

  lengthen (delta) {
    this.length += delta
  }

  tick (tree) {
    if (this.bud) {
      this.bud.tick(tree)
    }
    if (this.childSegments) {
      this.childSegments.forEach(cS => cS.tick(tree))
    }

    if (this.auxinLevel > 0.95) {
      this.lengthen(0.2)
    } else {
      this.width += 0.005
    }
    this.auxinLevel *= 0.85
    this.transmitAuxin()
  }

  draw (p5) {
    p5.push()
    p5.rotate(this.attachAngle)

    const greenBlueAmt = 255 - this.auxinLevel * 255
    p5.stroke(255, greenBlueAmt, greenBlueAmt)

    p5.strokeWeight(this.width)
    p5.line(0, 0, this.length, 0)

    p5.translate(this.length, 0)
    if (this.apicalMeristem) {
      this.apicalMeristem.draw(p5)
    }

    this.leaves.forEach(leaf => leaf.draw(p5))
    if (this.bud) {
      this.bud.draw(p5)
    }

    if (this.childSegments) {
      this.childSegments.forEach(cS => cS.draw(p5))
    }
    p5.pop()
  }
}

export default TreeSegment
