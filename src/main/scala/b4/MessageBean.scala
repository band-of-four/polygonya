package b4

import scala.beans.BeanProperty
import javax.faces.bean.{ManagedBean, ViewScoped}

@ManagedBean(name = "message")
@ViewScoped
class MessageBean extends Serializable {
  private val SPRITE_IDLE = "kaiki-chan-idle.png"
  private val SPRITE_ANGRY = "kaiki-chan-angry.png"
  private val SPRITE_BLUSHING = "kaiki-chan-blushing.png"
  private val SPRITE_THINKING = "kaiki-chan-thinking.png"

  @BeanProperty var sprite: String = _
  @BeanProperty var quote: String = _

  def showLogin() = {
    sprite = SPRITE_IDLE
    quote = "..."
  }

  def showSignup() = {
    sprite = SPRITE_IDLE
    quote = "... ... ..."
  }

  def showSignupNameTaken(name: String) = {
    sprite = SPRITE_ANGRY
    quote = s"$name?! Надеюсь, ты не тот, о ком я думаю, и просто ошибся в имени... Попробуй написать другое."
  }

  def showGraphIntro() = {
    sprite = SPRITE_IDLE
    quote = "Снова ты?! Вот идиот, даже не можешь график прочитать... Ну, раз уж пришел, давай посмотрим вместе."
  }

  def showValidationOutOfRange(field: String, min: String, max: String) = {
    sprite = SPRITE_ANGRY
    quote = s"Ещё раз $field окажется не между $min и $max — стукну!"
  }
}
