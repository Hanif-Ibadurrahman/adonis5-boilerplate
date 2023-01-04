import { test } from '@japa/runner'
import { UnprocessableInputs } from 'tests/helper'
import _ from 'lodash'
import { HTTP_STATUS_OK, HTTP_STATUS_UNPROCESSABLE_ENTITY } from 'App/Helper/Response/HttpResponse'
import User from 'App/Models/User'

const originalUsername = 'superadmin'
const originalPassword = 'secret123'

const validInput = {
  username: originalUsername,
  password: originalPassword,
}

test.group('Test validation when invalid request body', async () => {
  const withoutUsername = _.cloneDeep(validInput)
  _.unset(withoutUsername, ['username'])
  const withoutPassword = _.cloneDeep(validInput)
  _.unset(withoutPassword, ['password'])

  const invalidInputUser: UnprocessableInputs = {
    'without "username"': {
      errorBag: 'username',
      invalidInput: withoutUsername,
    },
    'without "password"': {
      errorBag: 'password',
      invalidInput: withoutPassword,
    },
  }

  for (const [inputInfo, { errorBag, invalidInput }] of Object.entries(invalidInputUser)) {
    test(`will return error bag when ${inputInfo}`, async ({ client, assert }) => {
      const expectedErrorResponse = {
        errors: [
          {
            rule: 'required',
            field: errorBag,
            message: 'required validation failed',
          },
        ],
      }

      const response = await client.post('/login').json(invalidInput)
      assert.equal(response.status(), HTTP_STATUS_UNPROCESSABLE_ENTITY)
      response.assertBody(expectedErrorResponse)
    })
  }
})

test.group('Try login', async (group) => {
  group.each.setup(async () => {
    await User.create({
      username: originalUsername,
      password: originalPassword,
    })
  })

  test('successfully login with valid data', async ({ client, assert }) => {
    const response = await client.post('/login').json(validInput)

    response.assert?.equal(response.status(), HTTP_STATUS_OK)
    assert.onlyProperties(response.body().data, ['type', 'token', 'refreshToken', 'expires_at'])
  })
})
