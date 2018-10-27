package b4

import scala.beans.BeanProperty
import scala.collection.JavaConverters._
import javax.faces.bean.{ManagedBean, SessionScoped, ManagedProperty}
import java.util.ArrayList

@ManagedBean(name = "graph")
@SessionScoped
class GraphBean extends Serializable {
  @ManagedProperty(value="#{sessionData.history}")
  @BeanProperty var graphHistory = new ArrayList[HistoryEntry]

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
      <path fill="none" stroke="#000" stroke-width="1px" d="M199 39l160 160"/>
      <path fill="none" stroke="#000" stroke-width="1px" d="M359 199v80"/>
      <path fill="none" stroke="#000" stroke-width="1px" d="M359 279H199"/>
      <path fill="none" stroke="#000" stroke-width="1px" d="M199 279q-80-10-80-80"/>
      """ +
      /* axis labels */
      """
      <text x="180" y="44" font-weight="400"><tspan x="180" y="44" font-size="16px">R</tspan></text>
      <text x="106" y="190" font-weight="400"><tspan x="106" y="190" font-size="16px">R/2</tspan></text>
      <text x="166" y="296" font-weight="400"><tspan x="166" y="296" font-size="16px">R/2</tspan></text>
      <text x="360" y="190" font-weight="400"><tspan x="360" y="190" font-size="16px">R</tspan></text>
      <g id="graph__points">
      """ +
      renderPoints() +
      """
      </g>
    </svg>
    """

  private def renderPoints(): String =
    graphHistory.asScala.map((h: HistoryEntry) =>
      s"""<circle cx="${h.x}" cy="${h.y}" fill="${if (h.res) "green" else "red"}" r="3" stroke-width="0"></circle>""").mkString("")
}
