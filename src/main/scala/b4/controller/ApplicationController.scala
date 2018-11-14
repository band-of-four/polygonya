package b4.controller

import b4.model.User
import javax.servlet.http.HttpSession
import org.springframework.http.{HttpStatus, ResponseEntity}

abstract class ApplicationController {
  protected def authenticated[T](session: HttpSession)(handler: User => ResponseEntity[T]): ResponseEntity[T] =
    session.getAttribute("user") match {
      case null => new ResponseEntity(HttpStatus.UNAUTHORIZED)
      case userObj => handler(userObj.asInstanceOf[User])
    }
}
