package b4

import java.io.File
import java.nio.file.Files
import javax.servlet.annotation.WebServlet
import javax.servlet.http.{
  HttpServlet,
  HttpServletRequest => HttpReq,
  HttpServletResponse => HttpResp}

@WebServlet(Array("/*"))
class ControllerServlet extends HttpServlet {
  override def doGet(req: HttpReq, resp: HttpResp) =
  	req.getPathInfo() match {
  		case url if url != null && url.startsWith("/static/") =>
  			staticHandler(url.substring(8), resp)
  		case url if url != null && url.startsWith("/areaCheck") =>
  			req.getRequestDispatcher("AreaCheckServlet").forward(req, resp)
  		case _ =>
  			req.getRequestDispatcher("index.jsp").forward(req, resp)
  	}

  def staticHandler(path: String, resp: HttpResp) = {
    val file = new File("client/dist", path)

    resp.setHeader("Content-Type", getServletContext().getMimeType(path))
    resp.setHeader("Content-Length", file.length().toString())

    Files.copy(file.toPath(), resp.getOutputStream())
  }
}
