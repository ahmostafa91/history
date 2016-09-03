import expect from 'expect'
import execSteps from './execSteps'

export default (history, done) => {
  let unblock, hookWasCalled = false
  const steps = [
    (location) => {
      expect(location).toMatch({
        path: '/'
      })

      history.push('/home')
    },
    (location, action) => {
      expect(action).toBe('PUSH')
      expect(location).toMatch({
        path: '/home'
      })

      unblock = history.block(() => {
        hookWasCalled = true
      })

      window.history.go(-1)
    },
    (location, action) => {
      expect(action).toBe('POP')
      expect(location).toMatch({
        path: '/'
      })

      expect(hookWasCalled).toBe(true)

      unblock()
    }
  ]

  execSteps(steps, history, done)
}
