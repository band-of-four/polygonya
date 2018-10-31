package b4.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.{ResourceHandlerRegistry, WebMvcConfigurer}

@Configuration
class AssetsConfiguration extends WebMvcConfigurer {
  override def addResourceHandlers(registry: ResourceHandlerRegistry): Unit =
    registry.addResourceHandler("/assets/**").addResourceLocations("file:client/dist/")
}
