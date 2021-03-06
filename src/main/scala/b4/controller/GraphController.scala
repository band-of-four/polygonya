package b4.controller

import b4.repository.HistoryRepository
import b4.service.GraphService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.{HttpStatus, RequestEntity, ResponseEntity}
import org.springframework.web.bind.annotation.{RequestBody, RequestMapping, RequestMethod, RestController}

import scala.beans.BeanProperty
import scala.collection.JavaConverters._

case class GraphRequest(@BeanProperty x: Double, @BeanProperty y: Double, @BeanProperty r: Double)

@RestController
@RequestMapping(Array("/graph"))
class GraphController {
  @Autowired
  var historyRepository: HistoryRepository = _
  @Autowired
  var graphService: GraphService = _

  @RequestMapping(value = Array("/check"), method = Array(RequestMethod.POST))
  def check(@RequestBody request: GraphRequest): ResponseEntity[Boolean] =
    request match {
      case GraphRequest(x, y, r) =>
        new ResponseEntity(graphService.check(x = x, y = y, r = r), HttpStatus.OK)
      case _ =>
        new ResponseEntity(false, HttpStatus.BAD_REQUEST)
    }

  @RequestMapping(value = Array("/bulkcheck"), method = Array(RequestMethod.POST))
  def bulkCheck(@RequestBody request: java.lang.Iterable[GraphRequest]): ResponseEntity[java.lang.Iterable[Boolean]] = {
    val results = request.asScala.map(req => graphService.check(req.x, req.y, req.r)).asJava
    new ResponseEntity(results, HttpStatus.OK)
  }
}
