package b4.model

import javax.persistence._

@Entity
@Table(name="history_entries")
class HistoryEntry {
  @Id
  var id: Long = _

  var x: Double = _

  var y: Double = _
  
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
  
