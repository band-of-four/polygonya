package b4.service

import b4.model.User
import b4.repository.UserRepository
import org.mindrot.jbcrypt.BCrypt
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class UserService {
  @Autowired
  var userRepository: UserRepository = _

  def authorize(username: String, password: String): Option[User] =
    userRepository.findByUsername(username) match {
      case Some(user) =>
        if (BCrypt.checkpw(password, user.passwordHash)) Some(user)
        else None
      case _ =>
        None
    }

  def signUp(username: String, password: String): Either[String, User] =
    if (userRepository.existsByUsername(username)) {
      Left("User name is already taken :(")
    }
    else {
      val hash = BCrypt.hashpw(password, BCrypt.gensalt(12))
      Right(userRepository.save(new User(username, hash)))
    }

}
