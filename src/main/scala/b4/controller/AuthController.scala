package b4.controller

import b4.service.UserService
import javax.servlet.http.HttpSession
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.web.bind.annotation.{RequestBody, RequestMapping, RequestMethod, RestController}

import scala.beans.BeanProperty

case class LoginRequest(@BeanProperty username: String, @BeanProperty password: String)

@RestController
@RequestMapping(Array("/auth"))
class AuthController {
  @Autowired
  var userService: UserService = _

  @RequestMapping(value = Array("/login"), method = Array(RequestMethod.POST))
  def login(@RequestBody request: LoginRequest, session: HttpSession): ResponseEntity[Unit] =
    userService.authorize(request.username, request.password) match {
      case Some(user) =>
        session.setAttribute("user", user)
        new ResponseEntity[Unit](HttpStatus.OK)
      case _ =>
        new ResponseEntity[Unit](HttpStatus.UNAUTHORIZED)
    }

  @RequestMapping(value = Array("/signup"), method = Array(RequestMethod.POST))
  def signUp(@RequestBody request: LoginRequest, session: HttpSession): ResponseEntity[String] = {
    userService.signUp(request.username, request.password) match {
      case Right(user) =>
        session.setAttribute("user", user)
        new ResponseEntity("success", HttpStatus.OK)
      case Left(err) =>
        new ResponseEntity(err, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }
}
