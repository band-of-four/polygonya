package b4.repository

import org.springframework.data.repository.CrudRepository
import b4.model.{HistoryEntry, User}

trait HistoryRepository extends CrudRepository[HistoryEntry, Long] {
  def findByUser(user: User): java.lang.Iterable[HistoryEntry]
}
