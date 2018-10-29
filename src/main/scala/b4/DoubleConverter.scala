package b4

import javax.faces.application.FacesMessage
import javax.faces.component.UIComponent
import javax.faces.context.FacesContext
import javax.faces.convert.{Converter, ConverterException, FacesConverter}

@FacesConverter("doubleConverter")
class DoubleConverter extends Converter {
  def message(): MessageBean =
    FacesContext.getCurrentInstance.getApplication.evaluateExpressionGet(
      FacesContext.getCurrentInstance, "#{message}", classOf[MessageBean])

  override def getAsObject(context: FacesContext, component: UIComponent, value: String): Object =
    try {
      value.toDouble.asInstanceOf[AnyRef]
    }
    catch {
      case _: Exception =>
        message.showValidationNaN(component.getAttributes.get("name").asInstanceOf[String].toUpperCase)
        throw new ConverterException(new FacesMessage("not a number"))
    }

  override def getAsString(context: FacesContext, component: UIComponent, value: Object): String =
    value.asInstanceOf[Double].toString
}
