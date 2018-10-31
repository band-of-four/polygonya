package b4.config

import org.springframework.context.annotation.{Bean, Configuration}
import org.springframework.web.servlet.config.annotation.{ResourceHandlerRegistry, ViewControllerRegistry, WebMvcConfigurer}
import org.springframework.web.servlet.view.InternalResourceViewResolver

@Configuration
class AssetsConfiguration extends WebMvcConfigurer {
  @Bean
  def getViewResolver: InternalResourceViewResolver =
    new InternalResourceViewResolver() { setSuffix(".html") }

  override def addViewControllers(registry: ViewControllerRegistry): Unit =
    registry.addViewController("/").setViewName("index")

  override def addResourceHandlers(registry: ResourceHandlerRegistry): Unit =
    registry.addResourceHandler("/assets/**").addResourceLocations("file:client/dist/")
}
