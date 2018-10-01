package b4

import scala.math.{pow, sqrt, abs}
import scala.util.Try
import scala.collection.JavaConverters._
import java.util.{ArrayList, Map => JavaMap}
import javax.servlet.http.{
  HttpServlet,
  HttpServletRequest => HttpReq,
  HttpServletResponse => HttpResp,
	HttpSession}

class AreaCheckServlet extends HttpServlet {
	override def doGet(req: HttpReq, resp: HttpResp) = {
		val result = for {
			r <- parseDouble(Option(req.getParameter("r")), 1.0, 5.0)
			x <- parseDouble(Option(req.getParameter("x")), -3.0, 5.0)
			y <- parseDouble(Option(req.getParameter("y")), -5.0, 5.0)
		} yield (r, x, y, pointCheck(r, x, y))

		result match {
			case Some((r, x, y, status)) => {
				val session = req.getSession(true)
				val map = Map("r" -> r, "x" -> x, "y" -> y, "status" -> status).asJava
				session.getAttribute("list") match {
					case null =>
						session.setAttribute("list", new ArrayList[JavaMap[String, AnyVal]](List(map).asJava))
					case list: ArrayList[JavaMap[String, AnyVal]] =>
						list.add(map)
				}
				resp.getWriter.print(status)
			}
			case _ =>
				resp.sendError(400)
		}
	}

	def parseDouble(s: Option[String], min: Double, max: Double): Option[Double] =
		for {
			input <- s
			parsed <- Try { input.toDouble }.toOption
			res <- if (parsed >= min && parsed <= max) Some(parsed) else None
		} yield res

	def pointCheck(r: Double, x: Double, y: Double): Boolean =
	    if (x >= 0 && y >= 0)       y < (r - x)
	    else if (x <= 0 && y <= 0)  sqrt(pow(x, 2) + pow(y, 2)) <= r/2
	    else if (x > 0 && y <= 0)   x < r && abs(y) < (r/2)
	    else                        false

}
