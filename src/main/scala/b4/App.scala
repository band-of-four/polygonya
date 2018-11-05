package b4

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import javax.sql.DataSource

@SpringBootApplication
class App {
  @Autowired var dataSource: DataSource = _
}

object App {
  def main(args: Array[String]): Unit = SpringApplication run classOf[App]
}
