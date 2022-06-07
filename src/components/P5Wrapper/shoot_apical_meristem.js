import ApicalMeristem from "./apical_meristem"
import AxillaryBud from "./axillary_bud"
import Leaf from "./leaf"

class ShootApicalMeristem extends ApicalMeristem {
  addBranch () {
    this.segment.bud = new AxillaryBud(this.attachAngle * this.attachDir, this.segment)
    this.segment.attachLeaf(new Leaf(Math.PI / 4 * this.attachDir))
    this.attachDir *= -1
  }
}

export default ShootApicalMeristem
