package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, SessionScoped}
import javax.faces.context.FacesContext
import javax.servlet.http.HttpServletRequest
import java.util.ArrayList

@ManagedBean(name = "auth")
@SessionScoped
class AuthBean extends Serializable {
  @BeanProperty var username: String = ""
  @BeanProperty var password: String = ""

  def login() = {
    val context = FacesContext.getCurrentInstance.getExternalContext
    val request = context.getRequest.asInstanceOf[HttpServletRequest]
    request.login(username, password)
  }
}
