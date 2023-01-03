import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'Util/HealthChecksController.index')
Route.get('/test', 'Util/HealthChecksController.test')
