package b4

import org.glassfish.embeddable.{GlassFish, GlassFishRuntime, GlassFishProperties, Deployer}
import java.io.File

object DevRunner {
  def main(args: Array[String]): Unit = {
    val port: Int = args(0).toInt
    val file = new File(args(1))

    val gf = GlassFishRuntime.bootstrap.newGlassFish(new GlassFishProperties {
      setPort("http-listener", port)
    })
    gf.start()
    gf.getService(classOf[Deployer]).deploy(file, "--contextroot=/", "--force=true")
  }
}
