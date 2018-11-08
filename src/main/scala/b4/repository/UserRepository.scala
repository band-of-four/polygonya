package b4.repository

import org.springframework.data.repository.CrudRepository

trait UserRepository[User, String] extends CrudRepository[User, String] {
  def findByUsername(username: String): User
}
