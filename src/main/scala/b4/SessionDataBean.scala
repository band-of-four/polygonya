package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, SessionScoped}
import scala.collection.mutable.LinkedList

@ManagedBean(name = "sessionData")
@SessionScoped
class SessionDataBean extends Serializable {
  @BeanProperty var history = new LinkedList[String]
}
