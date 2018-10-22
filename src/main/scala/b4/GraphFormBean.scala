package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, SessionScoped, ManagedProperty}
import javax.faces.application.FacesMessage
import javax.faces.validator.ValidatorException
import javax.faces.context.FacesContext
import javax.faces.component.UIComponent
import b4.SessionDataBean
import b4.History

@ManagedBean(name = "graphForm")
@SessionScoped
class GraphFormBean extends Serializable {
  @BeanProperty var r: Double = 0.0
  @BeanProperty var x: Double = 0.0
  @BeanProperty var y: Double = 0.0
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
