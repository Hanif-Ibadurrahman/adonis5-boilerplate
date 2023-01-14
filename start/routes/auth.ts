import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'AuthsController.login')
Route.post('/refresh-token', 'AuthsController.refreshToken')
Route.post('/logout', 'AuthsController.logout')
