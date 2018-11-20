package b4

import b4.model.User
import b4.repository.UserRepository
import org.mindrot.jbcrypt.BCrypt
import org.springframework.beans.factory.annotation.Autowired


class SyncControllerTest extends SpringIntegrationTest {
  @Autowired
  private var userRepository: UserRepository = _

  private lazy val existingUser: User =
    userRepository.save(new User("lucy", BCrypt.hashpw("lilium", BCrypt.gensalt(12))))
  private lazy val existingUserJson =
    "{\"username\": \"" + existingUser.username + "\", \"password\": \"lilium\"}"

  "/sync/info" should "return an actual information about current user" in {
    val performJson =
      "{\"newDay\":1, \"relationshipDelta\":1, \"history\":[{\"x\":1, \"y\":1}, {\"x\":2, \"y\":2}]}"
    get("/sync/info") should be (401, None)
    post("/sync/perform", performJson) should be (401, None)
    post("/auth/login", existingUserJson)
    get("/sync/info") should be (200,Some("{\"day\":0,\"relationship\":0,\"relationshipDelta\":0}"))
    post("/sync/perform", performJson) should be (200, None)
    get("/sync/info") should be (200,Some("{\"day\":1,\"relationship\":1,\"relationshipDelta\":1}"))
  }

  "/sync/history" should "return actual information about current user history" in {
    get("/sync/history") should be (401, None)
    post("/auth/login", existingUserJson)
    get("/sync/history") should be (200, None)
  }
}
