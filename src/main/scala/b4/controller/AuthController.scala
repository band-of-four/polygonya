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
class AuthController extends ApplicationController {
  @Autowired
  var userService: UserService = _

  @RequestMapping(value = Array("/login"), method = Array(RequestMethod.POST))
  def login(@RequestBody request: LoginRequest, session: HttpSession): ResponseEntity[Unit] =
    userService.authorize(request.username, request.password) match {
      case Some(user) =>
        session.setAttribute("username", user.username)
        new ResponseEntity(HttpStatus.OK)
      case _ =>
        new ResponseEntity(HttpStatus.UNAUTHORIZED)
    }

  @RequestMapping(value = Array("/signup"), method = Array(RequestMethod.POST))
  def signUp(@RequestBody request: LoginRequest, session: HttpSession): ResponseEntity[String] = {
    userService.signUp(request.username, request.password) match {
      case Right(user) =>
        session.setAttribute("username", user.username)
        new ResponseEntity(HttpStatus.OK)
      case Left(err) =>
        new ResponseEntity(err, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  @RequestMapping(value = Array("/identity"), method = Array(RequestMethod.GET))
  def identity(session: HttpSession): ResponseEntity[String] =
    authenticated(session) { user =>
      new ResponseEntity(user.username, HttpStatus.OK)
    }

  @RequestMapping(value = Array("/logout"), method = Array(RequestMethod.DELETE))
  def logout(session: HttpSession): ResponseEntity[Unit] =
    authenticated(session) { _user =>
      session.invalidate()
      new ResponseEntity(HttpStatus.OK)
    }
}
