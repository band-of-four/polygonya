package b4.service

import b4.model.{HistoryEntry, User}
import b4.repository.{HistoryRepository, UserRepository}
import b4.service.SyncService.{HistoryForDay, HistoryItem}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import scala.beans.BeanProperty
import scala.collection.JavaConverters._

object SyncService {
  case class HistoryItem(@BeanProperty x: Double,
                         @BeanProperty y: Double)

  case class PushRequest(@BeanProperty newDay: Int,
                         @BeanProperty relationshipDelta: Int,
                         @BeanProperty history: java.lang.Iterable[HistoryItem],
                         @BeanProperty lastR: Double)

  case class PullResponse(@BeanProperty day: Int,
                          @BeanProperty relationship: Int,
                          @BeanProperty relationshipDelta: Int)

  case class HistoryForDay(@BeanProperty r: Double,
                           @BeanProperty history: java.lang.Iterable[HistoryItem])
}

@Service
class SyncService {
  @Autowired
  var userRepository: UserRepository = _
  @Autowired
  var historyRepository: HistoryRepository = _

  def saveUserState(request: SyncService.PushRequest, user: User): Boolean = {
    if (user.day + 1 != request.newDay) return false

    user.day = request.newDay
    user.relationshipMeter = user.relationshipMeter + request.relationshipDelta
    user.relationshipDelta = request.relationshipDelta
    userRepository.save(user)

    val history = request.history.asScala.map { entry =>
      new HistoryEntry(x = entry.x, y = entry.y, r = request.lastR, day = request.newDay - 1, user = user)
    }.asJava
    historyRepository.saveAll(history)

    true
  }

  def getUserState(user: User): SyncService.PullResponse =
    SyncService.PullResponse(user.day, user.relationshipMeter, user.relationshipDelta)

  def getHistory(user: User): java.util.Map[Int, HistoryForDay] =
    historyRepository
      .findByUser(user)
      .asScala
      .groupBy(_.day)
      .mapValues(entries => HistoryForDay(entries.head.r, entries.map(e => HistoryItem(e.x, e.y)).asJava))
      .asJava
}
