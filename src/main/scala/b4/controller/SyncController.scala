package b4.controller

import java.lang

import b4.model.{HistoryEntry, User}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.web.bind.annotation._
import b4.service.SyncService
import javax.servlet.http.HttpSession

@RestController
@RequestMapping(Array("/sync"))
class SyncController extends ApplicationController {
  @Autowired
  var syncService: SyncService = _

  @RequestMapping(value = Array("/perform"), method = Array(RequestMethod.POST))
  def perform(@RequestBody request: SyncService.Request, session: HttpSession): ResponseEntity[Unit] =
    authenticated(session) { user =>
    if (syncService.perform(request, user))
      new ResponseEntity[Unit](HttpStatus.OK)
    else
      new ResponseEntity[Unit](HttpStatus.BAD_REQUEST)
  }

  @RequestMapping(value = Array("/info"), method = Array(RequestMethod.GET))
  def getInfo(session: HttpSession): ResponseEntity[SyncService.Response] =
    authenticated(session) { user =>
      val response = syncService.getInfo(user)
      new ResponseEntity[SyncService.Response](response, HttpStatus.OK)
    }

  @RequestMapping(value = Array("/history"), method = Array(RequestMethod.GET))
  def getHistory(session: HttpSession): ResponseEntity[java.lang.Iterable[HistoryEntry]] =
    authenticated(session) { user =>
      val response = syncService.getHistory(user)
      new ResponseEntity[lang.Iterable[HistoryEntry]](response, HttpStatus.OK)
    }
}

