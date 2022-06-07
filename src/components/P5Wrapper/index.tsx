import sketch from './app'
import { ReactP5Wrapper } from 'react-p5-wrapper'

const P5Wrapper = (): JSX.Element => {
  return <ReactP5Wrapper sketch={sketch} />
}

export default P5Wrapper
