package b4.controller

import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.web.bind.annotation.{RequestBody, RequestMapping, RequestMethod, RestController}

import scala.beans.BeanProperty

case class LoginRequest(@BeanProperty username: String, @BeanProperty password: String)

@RestController
@RequestMapping(Array("/auth"))
class AuthController {
  @RequestMapping(value = Array("/login"), method = Array(RequestMethod.POST))
  def login(@RequestBody request: LoginRequest): ResponseEntity[Unit] =
    request match {
      case LoginRequest("test", "test") => new ResponseEntity[Unit](HttpStatus.OK)
      case _ => new ResponseEntity[Unit](HttpStatus.UNAUTHORIZED)
    }
}
