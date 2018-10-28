package b4

import java.security.MessageDigest
import java.sql.SQLIntegrityConstraintViolationException

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, ManagedProperty, RequestScoped}
import javax.faces.context.FacesContext
import javax.servlet.http.{HttpServletRequest, HttpSession}
import javax.annotation.Resource
import javax.sql.DataSource

@ManagedBean(name = "auth")
@RequestScoped
class AuthBean extends Serializable {
  @BeanProperty var username: String = ""
  @BeanProperty var password: String = ""

  @Resource(lookup = "jdbc/OJdbcPool")
  var dataSource: DataSource = _

  @ManagedProperty(value="#{message}")
  @BeanProperty var messageBean: MessageBean = _

  def isLoggedIn(): Boolean = {
    val session = FacesContext.getCurrentInstance.getExternalContext.getSession(false)
    session != null && session.asInstanceOf[HttpSession].getAttribute("username") != null
  }

  def login() = {
    val context = FacesContext.getCurrentInstance.getExternalContext
    val request = context.getRequest.asInstanceOf[HttpServletRequest]
    request.login(username, password)
    context.getSession(true).asInstanceOf[HttpSession].setAttribute("username", username)
    "/graph.xhtml?faces-redirect=true"
  }

  def logout() = {
    FacesContext.getCurrentInstance.getExternalContext.invalidateSession
    "/index.xhtml?faces-redirect=true"
  }

  def signup() = {
    /* Might as well be plaintext... */
    val passwordDigest = MessageDigest.getInstance("SHA-256")
    val sha256password = hexEncode(passwordDigest synchronized {
      passwordDigest.reset()
      passwordDigest.digest(password.getBytes("UTF-8"))
    })

    val conn = dataSource.getConnection
    val userInsertQuery = conn.prepareStatement("insert into users values (?, ?)")
    userInsertQuery.setString(1, username)
    userInsertQuery.setString(2, sha256password)
    val groupInsertQuery = conn.prepareStatement("insert into groups values (?, ?)")
    groupInsertQuery.setString(1, "user")
    groupInsertQuery.setString(2, username)

    try {
      conn.setAutoCommit(false)
      userInsertQuery.executeUpdate
      groupInsertQuery.executeUpdate
      conn.commit
      login
    } catch {
      case se: SQLIntegrityConstraintViolationException =>
        messageBean.showSignupNameTaken(username)
        conn.rollback
    } finally {
      conn.close
    }
  }

  private def hexEncode(bytes: Array[Byte]) = {
    val HEXADECIMAL = Array[Char]('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f')
    val sb = new StringBuilder(2 * bytes.length)
    for (byte <- bytes) {
      sb.append(HEXADECIMAL((byte & 0xf0) >> 4))
      sb.append(HEXADECIMAL(byte & 0x0f))
    }
    sb.toString()
  }
}
