package b4

import b4.model.User
import b4.repository.UserRepository
import org.mindrot.jbcrypt.BCrypt
import org.springframework.beans.factory.annotation.Autowired

class AuthControllerTest extends SpringIntegrationTest {
  @Autowired
  private var userRepository: UserRepository = _

  private lazy val existingUser: User =
    userRepository.save(new User("lain", BCrypt.hashpw("openthenext", BCrypt.gensalt(12))))
  private lazy val existingUserJson =
    "{\"username\": \"" + existingUser.username + "\", \"password\": \"openthenext\"}"

  "/auth/login" should "create a logged in session for an existing user" in {
    post("/auth/login", existingUserJson) shouldBe (200, None)
    get("/auth/identity") shouldBe (200, Some(existingUser.username))
  }

  "/auth/logout" should "invalidate the current session" in {
    post("/auth/login", existingUserJson) shouldBe (200, None)
    delete("/auth/logout") shouldBe (200, None)
    get("/auth/identity") shouldBe (401, None)
  }

  "/auth/signup" should "return an error if username is already taken" in {
    post("/auth/signup", existingUserJson) shouldBe (422, Some("User name is already taken :("))
  }

  "/auth/signup" should "create a logged in session" in {
    val userJson = "{\"username\": \"arisu\", \"password\": \"sheiswatchingme\"}"
    post("/auth/signup", userJson) shouldBe (200, None)
    get("/auth/identity") shouldBe (200, Some("arisu"))
  }

  "/auth/signup" should "create a new user" in {
    val userJson = "{\"username\": \"mika\", \"password\": \"perfectlynormal\"}"
    post("/auth/signup", userJson) shouldBe (200, None)

    val createdUser = userRepository.findByUsername("mika").orNull
    createdUser should not be null
    createdUser.passwordHash should startWith ("$2a$") // indicates a BCrypt hash
  }

  "/auth/identity" should "reflect latest database state" in {
    val userJson = "{\"username\": \"chisa\", \"password\": \"itdidntmatterifiwasthereornot\"}"
    post("/auth/signup", userJson) shouldBe (200, None)
    get("/auth/identity") shouldBe (200, Some("chisa"))
    get("/auth/identity") shouldBe (200, Some("chisa")) // make sure /auth/identity isn't just invalidating the session

    userRepository.deleteByUsername("chisa")

    get("/auth/identity") shouldBe (401, None)
  }
}
