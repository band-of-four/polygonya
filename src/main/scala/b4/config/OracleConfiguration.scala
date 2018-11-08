package b4.config

import scala.beans.BeanProperty
import oracle.jdbc.pool.OracleDataSource
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.{Bean, Configuration, Primary}

import javax.sql.DataSource

@Configuration
@ConfigurationProperties("spring.datasource")
class OracleConfiguration {
  @BeanProperty
  var username: String = _
  @BeanProperty
  var password: String = _
  @BeanProperty
  var url: String = _

  @Bean
  @Primary
  def dataSource(): DataSource = {
    val dataSource = new OracleDataSource()
    dataSource.setUser(username)
    dataSource.setPassword(password)
    dataSource.setURL(url)
    dataSource.setImplicitCachingEnabled(true)
    dataSource.setFastConnectionFailoverEnabled(true)
    dataSource
  }
}
