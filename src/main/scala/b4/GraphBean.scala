package b4

import scala.beans.BeanProperty
import scala.collection.JavaConverters._
import javax.faces.bean.{ManagedBean, RequestScoped, ManagedProperty}
import java.util.ArrayList

@ManagedBean(name = "graph")
@RequestScoped
class GraphBean extends Serializable {
  @ManagedProperty(value="#{sessionData.history}")
  @BeanProperty var graphHistory = new ArrayList[HistoryEntry]

  @ManagedProperty(value="#{graphForm.r}")
  @BeanProperty var graphR: Double = 1.0

  def render(): String = """
    <svg class="graph" ref="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <g id="graph__coordinate-plane">
        """ +
        /* horizontal and vertical axes */
        """
        <path fill="none" stroke="#000" stroke-width="1px" d="M0 199h400"/>
        <path fill="none" stroke="#000" stroke-width="1px" d="M199 0v400"/>
        """ +
        /* arrows */
        """
        <path fill="none" stroke="#000" stroke-width="1px" d="M199 0l-3 7"/>
        <path fill="none" stroke="#000" stroke-width="1px" d="M199 0l3 7"/>
        <path fill="none" stroke="#000" stroke-width="1px" d="M400 199l-6-3"/>
        <path fill="none" stroke="#000" stroke-width="1px" d="M400 199l-6 3"/>
      </g>
      <path fill="none" stroke="#000" stroke-width="1px" d="M39 199l160 160"/>
      <path fill="none" stroke="#000" stroke-width="1px" d="M39 119v80"/>
      <path fill="none" stroke="#000" stroke-width="1px" d="M39 119H199"/>
      <path fill="none" stroke="#000" stroke-width="1px" d="M199 39q+160+20+160+160"/>
      """ +
      /* axis labels */
      """
      <text x="180" y="44" font-weight="400"><tspan x="180" y="44" font-size="16px">R</tspan></text>
      <text x="106" y="190" font-weight="400"><tspan x="20" y="190" font-size="16px">R</tspan></text>
      <text x="166" y="296" font-weight="400"><tspan x="209" y="360" font-size="16px">R</tspan></text>
      <text x="360" y="190" font-weight="400"><tspan x="360" y="190" font-size="16px">R</tspan></text>
      <text x="360" y="190" font-weight="400"><tspan x="209" y="125" font-size="16px">R/2</tspan></text>
      <g id="graph__points">
      """ +
      renderPoints() +
      """
      </g>
    </svg>
    """

  private def renderPoints(): String = {
    graphHistory.asScala.map { h: HistoryEntry =>
      val fill = if (h.compute(graphR)) "green" else "red"
      val axisDim = 400.0
      val rDim = 160.0

      val xRel = h.x / graphR
      val yRel = h.y / graphR

      val x = (xRel * rDim) + (axisDim / 2)
      val y = (-yRel * rDim) + (axisDim / 2)

      s"""<circle cx="$x" cy="$y" fill="$fill" r="3" stroke-width="0"></circle>"""
    }.mkString("")
  }
}
