package b4.model

import javax.persistence._

@Entity
@Table(name = "users")
class User {
  @Id
  var username: String = _

  var passwordHash: String = _

  var day: Int = _

  var relationshipMeter: Int = _

  def this(username: String, passwordHash: String) = {
    this()
    this.username = username
    this.passwordHash = passwordHash
    this.day = 0
    this.relationshipMeter = 0
  }
}
