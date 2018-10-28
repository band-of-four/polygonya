package b4

import javax.servlet._
import javax.servlet.http.{HttpServletRequest, HttpServletResponse}

class AuthRedirectFilter extends Filter {
  override def init(filterConfig: FilterConfig): Unit = {}

  override def destroy(): Unit = {}

  override def doFilter(req: ServletRequest, res: ServletResponse, chain: FilterChain): Unit = {
    val session = req.asInstanceOf[HttpServletRequest].getSession(false)

    if (session != null && session.getAttribute("username") != null)
      res.asInstanceOf[HttpServletResponse].sendRedirect("/graph.xhtml")
    else
      chain.doFilter(req, res)
  }
}
