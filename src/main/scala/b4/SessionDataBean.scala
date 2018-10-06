package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, SessionScoped}
import java.util.ArrayList

@ManagedBean(name = "sessionData")
@SessionScoped
class SessionDataBean extends Serializable {
  @BeanProperty var history = new ArrayList[String]
}
