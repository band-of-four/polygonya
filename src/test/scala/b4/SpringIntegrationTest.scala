package b4

import org.junit.runner.RunWith
import org.scalatest.{BeforeAndAfterEach, FlatSpec, Matchers}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.http._
import org.springframework.test.context.TestContextManager
import org.springframework.test.context.junit4.SpringRunner

@RunWith(classOf[SpringRunner])
@SpringBootTest(webEnvironment = RANDOM_PORT)
class SpringIntegrationTest extends FlatSpec with BeforeAndAfterEach with Matchers {
  @Autowired
  var rest: TestRestTemplate = _
  @LocalServerPort
  val serverPort: Integer = null

  new TestContextManager(this.getClass).prepareTestInstance(this)

  private var headers: HttpHeaders = _
  private val baseUrl = s"http://localhost:$serverPort"

  override protected def beforeEach(): Unit = {
    headers = new HttpHeaders() {
      this.setContentType(MediaType.APPLICATION_JSON_UTF8)
    }
  }

  def post(relativeUrl: String, content: String): (Int, Option[String]) =
    exchange(relativeUrl, HttpMethod.POST, new HttpEntity(content, headers))

  def get(relativeUrl: String): (Int, Option[String]) =
    exchange(relativeUrl, HttpMethod.GET, new HttpEntity[Unit](headers))

  def delete(relativeUrl: String): (Int, Option[String]) =
    exchange(relativeUrl, HttpMethod.DELETE, new HttpEntity[Unit](headers))

  def exchange[T](relativeUrl: String, method: HttpMethod, request: HttpEntity[T]): (Int, Option[String]) = {
    val response = rest.exchange(baseUrl + relativeUrl, method, request, classOf[String])
    headers.put(HttpHeaders.COOKIE, Option(response.getHeaders.get("Set-Cookie")).getOrElse(java.util.Collections.emptyList()))
    (response.getStatusCodeValue, Option(response.getBody))
  }
}
