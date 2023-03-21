import { cleanup, render, screen } from '@testing-library/react'
import CaseList from './CaseList'

describe('Case List component', () => {
  beforeAll(() => {
    render(<CaseList />)
  })

  it('Checking the Button and table header rendered', () => {
    expect(screen.getByTest()).toBeInTheDocument()
  })

  afterAll(cleanup)
})
