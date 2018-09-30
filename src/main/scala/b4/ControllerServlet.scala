package b4

import java.io.File
import java.nio.file.Files
import javax.servlet.annotation.WebServlet
import javax.servlet.http.{
  HttpServlet,
  HttpServletRequest => HttpReq,
  HttpServletResponse => HttpResp}

@WebServlet(Array("/"))
class ControllerServlet extends HttpServlet {
  override def doGet(req: HttpReq, resp: HttpResp): Unit = {
    req.getRequestURI match {
      case "/" | null =>
        req.getRequestDispatcher("index.jsp").forward(req, resp)
      case url if url.startsWith("/static/") =>
        handleStatic(url.substring(8), resp)
      case url if url.startsWith("/areaCheck") =>
        req.getServletContext.getNamedDispatcher("b4.AreaCheckServlet").forward(req, resp)
      case _ =>
        resp.sendError(404)
    }
  }
  def handleStatic(path: String, resp: HttpResp): Unit = {
    val file = new File("client/dist", path)

    resp.setHeader("Content-Type", getServletContext.getMimeType(path))
    resp.setHeader("Content-Length", file.length.toString)

    Files.copy(file.toPath, resp.getOutputStream)
  }
}
