package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, RequestScoped}
import java.util.ArrayList
import javax.faces.context.FacesContext

@ManagedBean(name = "navigation")
@RequestScoped
class NavigationBean extends Serializable {

  def message(): MessageBean =
    FacesContext.getCurrentInstance.getApplication.evaluateExpressionGet(
      FacesContext.getCurrentInstance, "#{message}", classOf[MessageBean])

  def history(): String = {
    message.history()
    "history.xhtml?faces-redirect=true"
  }
  def graph(): String = {
    message.history()
    "graph.xhtml?faces-redirect=true"
  }
}
