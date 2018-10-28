package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, SessionScoped}
import java.util.ArrayList
import scala.math.{pow, sqrt}

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
) {
  def compute(): Boolean =
    if (x >= 0 && y >= 0)       sqrt(pow(x, 2) + pow(y, 2)) <= r
    else if (x < 0 && y >= 0)   (-x <= r) && (y <= r/2)
    else if (x <= 0 && y < 0)   -x <= r + y
    else                        false
  
  @BeanProperty val res: Boolean = compute()
}
