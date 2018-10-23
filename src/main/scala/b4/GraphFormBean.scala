package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, SessionScoped, ManagedProperty}
import javax.faces.application.FacesMessage
import javax.faces.validator.ValidatorException
import javax.faces.context.FacesContext
import javax.faces.component.UIComponent
import javax.servlet.ServletContext

@ManagedBean(name = "graphForm")
@SessionScoped
class GraphFormBean extends Serializable {
  @BeanProperty var r: Double = 0.0
  @BeanProperty var x: Double = 0.0
  @BeanProperty var y: Double = 0.0

  @BeanProperty var sprite: String = "kaiki-chan-idle.png"
  @BeanProperty var quote: String = "Снова ты?! Вот идиот, даже не можешь график прочитать... Ну, раз уж пришел, давай посмотрим вместе."

  @BeanProperty var graph: String = """
  <svg class="graph" ref="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <g id="graph__coordinate-plane">
      <!-- horizontal and vertical axes -->
      <path fill="none" stroke="#000" stroke-width="1px" d="M0 199h400"/>
      <path fill="none" stroke="#000" stroke-width="1px" d="M199 0v400"/>
      <!-- arrows -->
      <path fill="none" stroke="#000" stroke-width="1px" d="M199 0l-3 7"/>
      <path fill="none" stroke="#000" stroke-width="1px" d="M199 0l3 7"/>
      <path fill="none" stroke="#000" stroke-width="1px" d="M400 199l-6-3"/>
      <path fill="none" stroke="#000" stroke-width="1px" d="M400 199l-6 3"/>
    </g>
    <path fill="none" stroke="#000" stroke-width="1px" d="M199 39l160 160"/>
    <path fill="none" stroke="#000" stroke-width="1px" d="M359 199v80"/>
    <path fill="none" stroke="#000" stroke-width="1px" d="M359 279H199"/>
    <path fill="none" stroke="#000" stroke-width="1px" d="M199 279q-80-10-80-80"/>           
    <text x="180" y="44" font-weight="400">
      <tspan x="180" y="44" font-size="16px">R</tspan>
    </text>
    <text x="106" y="190" font-weight="400">
      <tspan x="106" y="190" font-size="16px">R/2</tspan>
    </text>
    <text x="166" y="296" font-weight="400">
      <tspan x="166" y="296" font-size="16px">R/2</tspan>
    </text>
    <text x="360" y="190" font-weight="400">
      <tspan x="360" y="190" font-size="16px">R</tspan>
    </text>
  </svg>
  """

  @ManagedProperty(value="#{sessionData}")
  @BeanProperty var sessionData = new SessionDataBean()

  def validateX(ctx: FacesContext, component: UIComponent, v: Object) {
    if (v.asInstanceOf[Double] < -5.0 || v.asInstanceOf[Double] > 3.0) {
      throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR, "x shold be in [-5; 3]", ""))
    }
  }

  def validateY(ctx: FacesContext, component: UIComponent, v: Object) {
    if (v.asInstanceOf[Double] < -5.0 || v.asInstanceOf[Double] > 3.0) {
      throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR, "y shold be in [-5; 3]", ""))
    }
  }

  def validateR(ctx: FacesContext, component: UIComponent, v: Object) {
    if (v.asInstanceOf[Double] < 2.0 || v.asInstanceOf[Double] > 5.0) {
      throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR, "r shold be in [2; 5]", ""))
    }
  }

  def compute() {
  	val history = new History()
  	history.r = r
  	history.x = x
  	history.y = y
  	sessionData.history add history
  }
}
