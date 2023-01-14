import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import type { EventsList } from '@ioc:Adonis/Core/Event'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException/InternalServerError'

export default class SendEmailListener {
  public async onNewStaff({ staff }: EventsList['send-email:new-staff']) {
    try {
      await Mail.use('smtp').sendLater((message) => {
        message
          .from(Env.get('MAILGUN_API_KEY'))
          .to(staff.email)
          .subject('Successfully registered as a new staff').html(`
                <h2 style="color:green;">Successfully registered as a new staff</h2>
                <h4>Dear Mr/Mrs/Ms ${staff.name},</h4>    
                <p>Congratulations, you have registered as a new staff</p>`)
      })
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected condition has occurred on the server when send email'
      )
    }
  }

  public async onNewMember({ member }: EventsList['send-email:new-member']) {
    try {
      await Mail.use('smtp').sendLater((message) => {
        message
          .from(Env.get('MAILGUN_API_KEY'))
          .to(member.email)
          .subject('Successfully registered as a new member').html(`
                <h2 style="color:green;">Successfully registered as a new member</h2>
                <h4>Dear Mr/Mrs/Ms ${member.name},</h4>    
                <p>Congratulations, you have registered as a new member</p>`)
      })
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected condition has occurred on the server when send email'
      )
    }
  }
}
