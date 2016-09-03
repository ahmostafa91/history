import expect from 'expect'
import execSteps from './execSteps'

export default (history, done) => {
  const steps = [
    (location) => {
      expect(location).toMatch({
        path: '/'
      })

      history.push('/home')
    },
    (location, action) => {
      expect(action).toEqual('PUSH')
      expect(location).toMatch({
        path: '/home'
      })

      history.goBack()
    },
    (location, action) => {
      expect(action).toEqual('POP')
      expect(location).toMatch({
        path: '/'
      })
    }
  ]

  execSteps(steps, history, done)
}
