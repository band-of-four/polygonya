package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, RequestScoped}
import java.util.ArrayList

@ManagedBean(name = "navigation")
@RequestScoped
class NavigationBean extends Serializable {
  def history(): String = "history.xhtml?faces-redirect=true"
  def graph(): String = "graph.xhtml?faces-redirect=true"
}
