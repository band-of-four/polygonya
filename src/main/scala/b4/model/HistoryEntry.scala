package b4.model

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence._

import scala.beans.BeanProperty

@Entity
@Table(name="history_entries")
class HistoryEntry {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @JsonIgnore
  @BeanProperty
  var id: java.lang.Long = _

  @BeanProperty
  var x: Double = _

  @BeanProperty
  var y: Double = _

  @BeanProperty
  var day: Int = _
  
  @ManyToOne
  @JoinColumn(name="username")
  var user: User = _

  def this(x: Double, y: Double, day: Int, user: User) {
    this()
    this.x = x
    this.y = y
    this.day = day
    this.user = user
  }
}
  
