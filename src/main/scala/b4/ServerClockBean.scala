package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, ViewScoped}
import java.time.LocalTime
import java.time.format.DateTimeFormatter

@ManagedBean(name = "serverClock")
@ViewScoped
class ServerClockBean extends Serializable {
  @BeanProperty var timeString = ""

  def update() = {
    timeString = LocalTime.now.format(DateTimeFormatter.ofPattern("hh:mm:ss a"))
  }
}