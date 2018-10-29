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

  @BeanProperty var shouldCompute = true

  def message(): MessageBean =
    FacesContext.getCurrentInstance.getApplication.evaluateExpressionGet(
      FacesContext.getCurrentInstance, "#{message}", classOf[MessageBean])

  def history(): HistoryBean =
    FacesContext.getCurrentInstance.getApplication.evaluateExpressionGet(
      FacesContext.getCurrentInstance, "#{history}", classOf[HistoryBean])

  def validateX(ctx: FacesContext, component: UIComponent, v: Object) {
    if (v.asInstanceOf[Double] < -5.0 || v.asInstanceOf[Double] > 3.0) {
      message.showValidationOutOfRange("X", "-5", "3")
      throw new ValidatorException(new FacesMessage())
    }
  }

  def validateY(ctx: FacesContext, component: UIComponent, v: Object) {
    if (v.asInstanceOf[Double] < -5.0 || v.asInstanceOf[Double] > 3.0) {
      message.showValidationOutOfRange("Y", "-5", "3")
      throw new ValidatorException(new FacesMessage())
    }
  }

  def validateR(ctx: FacesContext, component: UIComponent, v: Object) {
    if (v.asInstanceOf[Double] < 2.0 || v.asInstanceOf[Double] > 5.0) {
      message.showValidationOutOfRange("Y", "2", "5")
      throw new ValidatorException(new FacesMessage())
    }
  }

  def compute() =
    if (shouldCompute) {
      history.add(x, y)
      message.thinking()
      if (new HistoryEntry(x, y).compute(r)) {
        message.dotInside()
      }
      else {
        message.dotOutside()
      }
    }
    else shouldCompute = true
}
