package b4.service

import b4.model.{HistoryEntry, User}
import b4.repository.{HistoryRepository, UserRepository}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import scala.beans.BeanProperty
import scala.collection.JavaConverters._

object SyncService {
  case class HistoryItem(@BeanProperty x: Double, @BeanProperty y: Double)
  case class Request(@BeanProperty newDay: Int,
                     @BeanProperty relationshipDelta: Int,
                     @BeanProperty history: java.lang.Iterable[HistoryItem])
  case class Response(@BeanProperty day: Int,
                      @BeanProperty relationship: Int,
                      @BeanProperty relationshipDelta: Int)
}

@Service
class SyncService {
  @Autowired
  var userRepository: UserRepository = _
  @Autowired
  var historyRepository: HistoryRepository = _

  def perform(request: SyncService.Request, user: User): Boolean = {
    if (user.day + 1 != request.newDay) {
      return false
    }
    else {
      user.day = request.newDay
      user.relationshipMeter = user.relationshipMeter + request.relationshipDelta
      user.relationshipDelta = request.relationshipDelta
      userRepository.save(user)


      val history = request.history.asScala.map { entry =>
        new HistoryEntry(x = entry.x, y = entry.y, day = request.newDay - 1, user = user)
      }.asJava
      historyRepository.saveAll(history)
      return true
    }
  }

  def getInfo(user: User): SyncService.Response =
    SyncService.Response(user.day, user.relationshipMeter, user.relationshipDelta)

  def getHistory(user: User): java.lang.Iterable[HistoryEntry] =
    historyRepository.findByUser(user)
}
