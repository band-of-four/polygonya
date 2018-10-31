package b4

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
class App {}

object App {
  def main(args: Array[String]): Unit = SpringApplication run classOf[App]
}
