package b4.model

import javax.persistence._

@Entity
@Table(name="history_entries")
class HistoryEntries {
  var x: Double = _

  var y: Double = _
  
  var r: Double = _
  
  var day: Int = _
  
  @ManyToOne(fetch=FetchType.LAZY)
  @JoinColumn(name="username")
  var username: User = _
}
  
