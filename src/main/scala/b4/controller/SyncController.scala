package b4.controller

import b4.model.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.web.bind.annotation._
import b4.service.SyncService
import javax.servlet.http.HttpSession

@RestController
@RequestMapping(Array("/sync"))
class SyncController {
  @Autowired
  var syncService: SyncService = _

  @RequestMapping(value = Array("/perform"), method = Array(RequestMethod.POST))
  def perform(@RequestBody request: SyncService.Request, session: HttpSession): ResponseEntity[Unit] = {
    val user: User = session.getAttribute("user") match {
      case null => return new ResponseEntity[Unit](HttpStatus.UNAUTHORIZED)
      case userObj => userObj.asInstanceOf[User]
    }

    syncService.perform(request, user)

    new ResponseEntity[Unit](HttpStatus.OK)
  }

  @RequestMapping(value = Array("/info"), method = Array(RequestMethod.GET))
  def getInfo(session: HttpSession): ResponseEntity[SyncService.Response] = {
    val user: User = session.getAttribute("user") match {
      case null => return new ResponseEntity[SyncService.Response](HttpStatus.UNAUTHORIZED)
      case userObj => userObj.asInstanceOf[User]
    }
    val response = syncService.getInfo(user)
    new ResponseEntity[SyncService.Response](response, HttpStatus.OK)
  }
}

