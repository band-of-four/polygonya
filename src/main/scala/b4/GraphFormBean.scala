package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, SessionScoped, ManagedProperty}
import javax.faces.application.FacesMessage
import javax.faces.validator.ValidatorException
import javax.faces.context.FacesContext
import javax.faces.component.UIComponent
import javax.servlet.ServletContext
import java.util.ArrayList

@ManagedBean(name = "graphForm")
@SessionScoped
class GraphFormBean extends Serializable {
  @BeanProperty var r: Double = 2.0
  @BeanProperty var x: Double = 0.0
  @BeanProperty var y: Double = 0.0

  @ManagedProperty(value="#{sessionData.history}")
  @BeanProperty var graphHistory = new ArrayList[HistoryEntry]

  @BeanProperty var shouldCompute = true

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
    if (shouldCompute)
      graphHistory add new HistoryEntry(x, y)
    else shouldCompute = true
  }
}
