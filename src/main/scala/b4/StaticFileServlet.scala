package b4

import java.io.File
import java.nio.file.Files
import java.net.URLDecoder
import javax.servlet.annotation.WebServlet
import javax.servlet.http.{
  HttpServlet,
  HttpServletRequest => HttpReq,
  HttpServletResponse => HttpResp}

@WebServlet(Array("/static/*"))
class StaticFileServlet extends HttpServlet {
  override def doGet(req: HttpReq, resp: HttpResp) = {
    val filename = URLDecoder.decode(req.getPathInfo().substring(1), "UTF-8")
    val file = new File("client/dist", filename)

    resp.setHeader("Content-Type", getServletContext().getMimeType(filename))
    resp.setHeader("Content-Length", file.length().toString())

    Files.copy(file.toPath(), resp.getOutputStream())
  }
}
