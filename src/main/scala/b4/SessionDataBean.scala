package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, SessionScoped}
import java.util.ArrayList

@ManagedBean(name = "sessionData")
@SessionScoped
class SessionDataBean extends Serializable {
  @BeanProperty var history = new ArrayList[HistoryEntry]

  def clearHistory() {
    history = new ArrayList[HistoryEntry]
  }
}

class HistoryEntry(
  @BeanProperty val r: Double = 0.0,
  @BeanProperty val x: Double = 0.0,
  @BeanProperty val y: Double = 0.0,
  @BeanProperty val res: Boolean = true
)
