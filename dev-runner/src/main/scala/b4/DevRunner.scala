package b4

import org.glassfish.embeddable.{GlassFish, GlassFishRuntime, GlassFishProperties, Deployer}
import java.io.File

object DevRunner {
  def main(args: Array[String]): Unit = {
    val port: Int = args(0).toInt
    val warFile = new File(args(1))
    val configFile = new File(args(2))

    val gf = GlassFishRuntime.bootstrap.newGlassFish(new GlassFishProperties {
      setPort("http-listener", port)
      setConfigFileURI(configFile.toURI.toString)
    })
    gf.start()
    gf.getService(classOf[Deployer]).deploy(warFile, "--contextroot=/", "--force=true")
    //gf.getCommandRunner.run("ping-connection-pool", "ojdbc-pool")
  }
}
