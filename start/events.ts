/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Event from '@ioc:Adonis/Core/Event'

Event.on('send-email:new-staff', 'SendEmailListener.onNewStaff')
Event.on('send-email:new-member', 'SendEmailListener.onNewMember')
