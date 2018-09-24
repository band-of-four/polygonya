package b4

import javax.servlet.annotation.WebServlet
import javax.servlet.http.{
  HttpServlet,
  HttpServletRequest => HttpReq,
  HttpServletResponse => HttpResp}

@WebServlet(Array("/*"))
class ControllerServlet extends HttpServlet {
  def message =
    <html>
      <head><title>h</title></head>
      <body>Hello, World</body>
    </html>

  override def doGet(req: HttpReq, resp: HttpResp) =
    resp.getWriter().print(message)
}
