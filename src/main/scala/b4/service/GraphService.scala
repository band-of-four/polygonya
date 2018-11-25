package b4.service

import org.springframework.stereotype.Service

import scala.math.{pow, sqrt}

@Service
class GraphService {
  def check(x: Double, y: Double, r: Double): Boolean =
    if (x < 0 && y < 0)           sqrt(pow(x, 2) + pow(y, 2)) <= r
    else if (x <= 0 && y >= 0)    -x <= r && y <= r/2
    else if (x >= 0 && y > 0)     x <= (r/2 - y)
    else false
}
