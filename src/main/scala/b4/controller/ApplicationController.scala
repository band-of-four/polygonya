package b4.controller

import b4.model.User
import b4.repository.UserRepository
import javax.servlet.http.HttpSession
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.{HttpStatus, ResponseEntity}

abstract class ApplicationController {
  @Autowired
  private var userRepository: UserRepository = _

  protected def authenticated[T](session: HttpSession)(handler: User => ResponseEntity[T]): ResponseEntity[T] =
    Option(session.getAttribute("username").asInstanceOf[String])
      .flatMap(userRepository.findByUsername)
      .map(handler)
      .getOrElse(new ResponseEntity[T](HttpStatus.UNAUTHORIZED))
}
