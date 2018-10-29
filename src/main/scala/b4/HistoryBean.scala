package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, RequestScoped}
import javax.faces.context.FacesContext
import javax.annotation.Resource
import javax.servlet.http.HttpSession
import javax.sql.DataSource

import java.util.ArrayList
import scala.math.{pow, sqrt}

@ManagedBean(name = "history")
@RequestScoped
class HistoryBean extends Serializable {
  @Resource(lookup = "jdbc/OJdbcPool")
  var dataSource: DataSource = _

  def username(): String =
    FacesContext.getCurrentInstance.getExternalContext.getSession(false).asInstanceOf[HttpSession].getAttribute("username").asInstanceOf[String]

  def add(x: Double, y: Double) = {
    val conn = dataSource.getConnection
    val query = conn.prepareStatement("insert into history_entries values (?, ?, ?)")

    query.setString(1, username())
    query.setDouble(2, x)
    query.setDouble(3, y)

    query.executeUpdate
    conn.close()
  }

    def message(): MessageBean =
      FacesContext.getCurrentInstance.getApplication.evaluateExpressionGet(
        FacesContext.getCurrentInstance, "#{message}", classOf[MessageBean])
    
  def list(): ArrayList[HistoryEntry] = {
    val history = new ArrayList[HistoryEntry]

    val conn = dataSource.getConnection
    val query = conn.prepareStatement("select x, y from history_entries where username = ?")
    query.setString(1, username())

    val results = query.executeQuery()
    while (results.next())
      history add new HistoryEntry(x = results.getDouble("x"), y = results.getDouble("y"))

    results.close()
    conn.close()

    history
  }

  def clear() = {
    message.historyClear()
    val conn = dataSource.getConnection
    val query = conn.prepareStatement("delete from history_entries where username = ?")
    query.setString(1, username())
    query.executeUpdate
    conn.close()
  }
}

class HistoryEntry(
  @BeanProperty val x: Double = 0.0,
  @BeanProperty val y: Double = 0.0,
) {
  def compute(r: Double): Boolean =
    if (x >= 0 && y >= 0)       sqrt(pow(x, 2) + pow(y, 2)) <= r
    else if (x < 0 && y >= 0)   (-x <= r) && (y <= r/2)
    else if (x <= 0 && y < 0)   -x <= r + y
    else                        false
}
