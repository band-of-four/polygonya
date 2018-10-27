package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, RequestScoped, ManagedProperty}
import javax.faces.application.FacesMessage
import javax.faces.validator.ValidatorException
import javax.faces.context.FacesContext
import javax.faces.component.UIComponent
import javax.servlet.ServletContext
import java.util.ArrayList

@ManagedBean(name = "graphForm")
@RequestScoped
class GraphFormBean extends Serializable {
  @BeanProperty var r: Double = 0.0
  @BeanProperty var x: Double = 0.0
  @BeanProperty var y: Double = 0.0

  @BeanProperty var sprite: String = "kaiki-chan-idle.png"
  @BeanProperty var quote: String = "Снова ты?! Вот идиот, даже не можешь график прочитать... Ну, раз уж пришел, давай посмотрим вместе."

  @ManagedProperty(value="#{sessionData.history}")
  @BeanProperty var graphHistory = new ArrayList[HistoryEntry]

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

  def compute() = {
    graphHistory add new HistoryEntry(r, x, y, true)
  }
}
