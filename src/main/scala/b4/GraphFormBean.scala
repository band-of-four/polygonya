package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, SessionScoped, ManagedProperty}
import b4.SessionDataBean

@ManagedBean(name = "graphForm")
@SessionScoped
class GraphFormBean extends Serializable {
  @BeanProperty var r: Double = 0.0
  @BeanProperty var x: Double = 0.0
  @BeanProperty var y: Double = 0.0
  @ManagedProperty(value="#{sessionData}")
  @BeanProperty var sessionData = new SessionDataBean()

  def compute() {
  	sessionData.history add s"$r, $x, $y"
  }
}
