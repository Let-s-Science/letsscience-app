const sketch = (p5) => {
    let iterations
    let trunk_len
    let trunk_rad
    let theta = p5.PI / 2
    let angle = p5.PI / 4.5
    let perturb
    let ratio
    let width
    let height
    let root

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight - 40)

    iterations = 17
    trunk_len = 200
    trunk_rad = 3.0
    perturb = 6.0
    ratio = 0.8
    width = p5.windowWidth
    height = p5.windowHeight
    root = [width / 2.0, height / 2]

    p5.noLoop()
  }

  p5.draw = () => {
    p5.frameRate(1)
    p5.background(50)
    p5.translate(root[0], root[1])

    drawFractalTree(p5, iterations, [0, 100], trunk_len, ratio, theta, angle, perturb)
  }

    p5.getLineWidth = (level) => {
      return Math.max(1, trunk_rad * level / iterations)
  }

  p5.getColor = (level) => {
      let a = level / iterations
    let root_color = p5.createVector(0, 0, 0)
    let leaf_color = p5.createVector(215, 241, 65)
      leaf_color.mult((1 - a)).add(root_color.mult(a))
      return leaf_color
  }
}

const drawFractalTree = (p5, level, start, t, r, theta, angle, perturb) => {
    if (level == 0 ) {
        return;
    }

    p5.strokeWeight(p5.getLineWidth(level))
    let color = p5.getColor(level)
    p5.stroke(color.x, color.y, color.z)

    let x0 = start[0]
    let y0 = start[1]
    let randt = p5.random() * t
    let x = x0 + randt * p5.cos(theta)
    let y = y0 - randt * p5.sin(theta)

    p5.line(x0, y0, x, y)
    let theta1 = theta + p5.random() * (perturb / level) * angle
    let theta2 = theta - p5.random() * (perturb / level) * angle
    drawFractalTree(p5, level - 1, [x, y], t * r, r, theta1, angle, perturb)
    drawFractalTree(p5, level - 1, [x, y], t * r, r, theta2, angle, perturb)
}

export default sketch

