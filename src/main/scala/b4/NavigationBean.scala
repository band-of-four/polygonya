package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, RequestScoped}
import java.util.ArrayList

@ManagedBean(name = "navigation")
@RequestScoped
class NavigationBean extends Serializable {
  def history(): String = "history"
  def graph(): String = "graph"
}
