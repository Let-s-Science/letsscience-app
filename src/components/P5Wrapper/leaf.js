class Leaf {
  constructor (attachAngle) {
    this.attachAngle = attachAngle
  }

  draw (p5) {
    p5.push()
    p5.rotate(this.attachAngle)
    p5.strokeWeight(0.25)
    p5.stroke(255)
    p5.line(0, 0, 10, 0)
    p5.noStroke()
    p5.fill(50, 180, 50)
    p5.ellipse(15, 0, 10, 5)
    p5.pop()
  }
}

export default Leaf
