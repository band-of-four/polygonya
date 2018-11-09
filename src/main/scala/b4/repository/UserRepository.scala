package b4.repository

import org.springframework.data.repository.CrudRepository
import b4.model.User

trait UserRepository extends CrudRepository[User, String] {
  def findByUsername(username: String): Option[User]
  def save(user: User): User
  def existsByUsername(username: String): Boolean
}
