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
    quote = "Ну, чего молчишь? Я что, должна всех в лицо помнить?"
  }

  def showSignup() = {
    sprite = SPRITE_IDLE
    quote = "О, а вот и наш новый ученик! Не думай, что ты какой-то особенный."
  }

  def showSignupNameTaken(name: String) = {
    sprite = SPRITE_ANGRY
    quote = s"$name?! Надеюсь, ты не тот, о ком я думаю, и просто ошибся в имени... Попробуй написать другое."
  }

  def showGraphIntro() = {
    sprite = SPRITE_IDLE
    quote = "Ты совсем ничего не запомнил с нашей прошлой встречи? Придётся объяснить ещё раз."
  }

  def showValidationOutOfRange(field: String, min: String, max: String) = {
    sprite = SPRITE_ANGRY
    quote = s"Я разве не говорила, что $field должен быть между $min и $max?"
  }

  def showValidationNaN(field: String) = {
    sprite = SPRITE_ANGRY
    quote = s"Не хочешь ввести число в $field? :/"
  }

  def showLoginError() = {
    sprite = SPRITE_THINKING
    quote = "Хмм, не припомню такого. Может, ты неправильно написал пароль?"
  }

  def dotInside() = {
    sprite = SPRITE_BLUSHING
    quote = "Ты оказался прав.... Точка действительно внутри..."
  }

  def dotOutside() = {
    sprite = SPRITE_ANGRY
    quote = "Да ладно! Ты умудрился не попасть..."
  }

  def historyDisplay() = {
    sprite = SPRITE_BLUSHING
    quote = "А ведь если подумать, у нас с тобой столько общих воспоминаний..."
  }

  def historyClear() = {
    sprite = SPRITE_ANGRY
    quote = "...было"
  }
}
