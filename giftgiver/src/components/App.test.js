import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

// name and group a series of tests
describe('App', () => {
  const app = shallow(<App />)

  // "it", "expect" and "toMatchSnapshot" are all Jest methods
  it('renders correctly', () => {
    expect(app).toMatchSnapshot()
  })

  // backticks indicate that state is a special object or variable
  it('initialises the `state` with an empty list of gifts', () => {
    expect(app.state().gifts).toEqual([])
  })

  describe('when clicking the `Add Gift` button', () => {
    const id = 1

    beforeEach(() => {
      // find inner child nodes or components, by JSX tag or classname
      app.find('.btn-add').simulate('click')
    })
    afterEach(() => {
      app.setState({ gifts: [] })
    })
    it('adds a new gift to `state`', () => {
      expect(app.state().gifts).toEqual([{ id }])
    })

    it('adds a new gift to the rendered list', () => {
      expect(app.find('.gift-list').children().length).toEqual(1)
    })

    it('creates a gift component', () => {
      // find a JSX tag called 'Gift'
      expect(app.find('Gift').exists()).toBe(true)
    })

    describe('and then user wants to remove the added gift', () => {
      beforeEach(() => {
        // gain access to methods that app contains
        app.instance().removeGift(id)
      })

      it('removes the gift from `state`', () => {
        expect(app.state().gifts).toEqual([])
      })
    })
  })
})
