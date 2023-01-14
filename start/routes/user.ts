import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/users/staff', 'StaffsController.createStaff')
  Route.post('/users/member', 'MembersController.createMember')
}).middleware('auth:jwt')
