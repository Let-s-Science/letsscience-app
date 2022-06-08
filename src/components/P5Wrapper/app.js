import Tree from "./tree"
import SeasonalTime from "./seasonal_time"

const sketch = (p5) => {
  let tree
  let groundLevel
  let seasonalTime
  let visualScale
  const log10 = Math.log(10)

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight - 40)
    p5.frameRate(50000);

    visualScale = 1
    groundLevel = p5.floor(p5.height * 0.6)
    tree = new Tree(p5.floor(p5.width / 2), groundLevel, p5)

    seasonalTime = new SeasonalTime(0.1)
  }

  p5.draw = () => {
    p5.background(50)
    seasonalTime.tick()
    p5.drawGround(groundLevel)

    p5.push()
    p5.translate(tree.x, tree.y)
    p5.scale(visualScale)
    tree.tick(p5)
    tree.draw(p5)
    p5.pop()
  }

  p5.drawGround = (y) => {
    p5.stroke(230)
    p5.drawSolidBoundary(0 + 100, y, p5.width - 100, y)
  }

    p5.drawSolidBoundary = (fromX, fromY, toX, toY, options = {}) => {
    p5.line(fromX, fromY, toX, toY);
    const dashesAbove = options['dashes_above'] === true;

    p5.push();
    p5.translate(fromX, fromY);
    if (fromY != toY){
      // rotate ... but currently assumes a horizontal line
    }

    const dashWidth = 20;
    const numDashes = Math.floor((toX - fromX) / dashWidth);
    let curX = 0;
    let startY  = dashesAbove ? 0 : dashWidth;
    let endY    = dashesAbove ? - dashWidth : 0;

    for (var i = 0; i<numDashes; i++){
      p5.line(curX, startY, curX + dashWidth, endY);
      curX += dashWidth;
    }
    p5.pop();
  }
}

export default sketch
