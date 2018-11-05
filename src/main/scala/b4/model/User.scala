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
}
