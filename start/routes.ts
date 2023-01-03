import './routes/auth'

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'Util/HealthChecksController.index')
