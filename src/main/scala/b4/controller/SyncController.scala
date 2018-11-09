package b4.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.web.bind.annotation.{RequestBody, RequestMapping, RequestMethod, RestController}
import b4.repository._
import scala.beans.BeanProperty

case class SyncRequest()

