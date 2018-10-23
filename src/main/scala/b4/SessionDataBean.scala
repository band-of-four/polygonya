package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, SessionScoped}
import java.util.ArrayList

@ManagedBean(name = "sessionData")
@SessionScoped
class SessionDataBean extends Serializable {
  @BeanProperty var history = new ArrayList[History]
  def clearHistory() {
    history = new ArrayList[History]
  }
}

@ManagedBean(name = "history")
@SessionScoped
class History extends Serializable {
	@BeanProperty var r: Double = 0.0
	@BeanProperty var x: Double = 0.0
	@BeanProperty var y: Double = 0.0
	@BeanProperty var res: Boolean = true
}
