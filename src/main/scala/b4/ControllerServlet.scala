package b4

import javax.servlet.annotation.WebServlet
import javax.servlet.http.{
  HttpServlet,
  HttpServletRequest => HttpReq,
  HttpServletResponse => HttpResp}

@WebServlet(Array("/h"))
class ControllerServlet extends HttpServlet {
  override def doGet(req: HttpReq, resp: HttpResp) =
    req.getRequestDispatcher("index.jsp").forward(req, resp)
}
