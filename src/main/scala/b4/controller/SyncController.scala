package b4.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.web.bind.annotation._
import b4.service.SyncService
import b4.service.SyncService.HistoryForDay
import javax.servlet.http.HttpSession

@RestController
@RequestMapping(Array("/sync"))
class SyncController extends ApplicationController {
  @Autowired
  var syncService: SyncService = _

  @RequestMapping(value = Array("/push"), method = Array(RequestMethod.POST))
  def perform(@RequestBody request: SyncService.PushRequest, session: HttpSession): ResponseEntity[Unit] =
    authenticated(session) { user =>
      if (syncService.saveUserState(request, user))
        new ResponseEntity(HttpStatus.OK)
      else
        new ResponseEntity(HttpStatus.UNPROCESSABLE_ENTITY)
    }

  @RequestMapping(value = Array("/pull"), method = Array(RequestMethod.GET))
  def getInfo(session: HttpSession): ResponseEntity[SyncService.PullResponse] =
    authenticated(session) { user =>
      val response = syncService.getUserState(user)
      new ResponseEntity(response, HttpStatus.OK)
    }

  @RequestMapping(value = Array("/history"), method = Array(RequestMethod.GET))
  def getHistory(session: HttpSession): ResponseEntity[java.util.Map[Int, HistoryForDay]] =
    authenticated(session) { user =>
      val response = syncService.getHistory(user)
      new ResponseEntity(response, HttpStatus.OK)
    }
}

