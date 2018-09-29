package b4

import scala.math.{pow, sqrt}
import scala.util.{Either, Try}
import javax.servlet.http.{
  HttpServlet,
  HttpServletRequest => HttpReq,
  HttpServletResponse => HttpResp}

class AreaCheckServlet extends HttpServlet {
	override def doGet(req: HttpReq, resp: HttpResp) = {
		val status = for {
			r <- parseDouble(Option(req.getParameter("r")), 1.0, 5.0)
			x <- parseDouble(Option(req.getParameter("x")), -3.0, 5.0)
			y <- parseDouble(Option(req.getParameter("y")), -5.0, 5.0)
		} yield pointCheck(r, x, y)

		resp.getWriter().println(status)
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
	    else if (x > 0 && y <= 0)   x < r && y < (r/2)
	    else                        false
}