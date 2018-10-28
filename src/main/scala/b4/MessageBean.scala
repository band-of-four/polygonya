package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, RequestScoped}

@ManagedBean(name = "message")
@RequestScoped
class MessageBean extends Serializable {
  @BeanProperty var sprite: String = "kaiki-chan-idle.png"
  @BeanProperty var quote: String = "Снова ты?! Вот идиот, даже не можешь график прочитать... Ну, раз уж пришел, давай посмотрим вместе."
}
