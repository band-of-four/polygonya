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

  "/sync/pull" should "return current player state" in {
    val performJson = "{\"newDay\":2, \"relationshipDelta\":1, \"history\":[]}"
    get("/sync/pull") should be (401, None)
    post("/sync/push", performJson) should be (401, None)
    post("/auth/login", existingUserJson)
    get("/sync/pull") should be (200,Some("{\"day\":1,\"relationship\":0,\"relationshipDelta\":0,\"testsDone\":0}"))
    post("/sync/push", performJson) should be (200, None)
    get("/sync/pull") should be (200,Some("{\"day\":2,\"relationship\":1,\"relationshipDelta\":1,\"testsDone\":0}"))
  }

  "/sync/history" should "return graph history, grouped by days" in {
    get("/sync/history") should be (401, None)
    post("/auth/signup", """{"username":"nyu","password": "ocastitatislilium"}""")
    get("/sync/history") should be (200, Some("{}"))
    post("/sync/push", "{\"newDay\":2, \"lastR\":2, \"history\":[{\"x\":0.1, \"y\":0.2}, {\"x\":0.3, \"y\":0.4}]}")
    post("/sync/push", "{\"newDay\":3, \"lastR\":4.5, \"history\":[{\"x\":0.5, \"y\":0.6}, {\"x\":0.7, \"y\":0.8}]}")
    post("/sync/push", "{\"newDay\":4, \"lastR\":1, \"history\":[{\"x\":0.9, \"y\":1.0}, {\"x\":1.1, \"y\":1.2}]}")
    get("/sync/history") should be (200, Some(
      "{\"2\":{\"r\":4.5,\"history\":[{\"x\":0.5,\"y\":0.6,\"inside\":true},{\"x\":0.7,\"y\":0.8,\"inside\":true}]}" +
      ",\"1\":{\"r\":2.0,\"history\":[{\"x\":0.1,\"y\":0.2,\"inside\":true},{\"x\":0.3,\"y\":0.4,\"inside\":true}]}" +
      ",\"3\":{\"r\":1.0,\"history\":[{\"x\":0.9,\"y\":1.0,\"inside\":false},{\"x\":1.1,\"y\":1.2,\"inside\":false}]}}"))
    get("/sync/pull") should be (200,Some("{\"day\":4,\"relationship\":0,\"relationshipDelta\":0,\"testsDone\":3}"))
  }
}
