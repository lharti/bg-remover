import { BgRemover } from '@/components/BgRemover'
import { render } from '@testing-library/react'
import React from 'react'
import Home from './page'

jest.mock('@/components/BgRemover')

jest.mocked(BgRemover).mockImplementation(({ className }) => (
    <div className={className}>{'BgRemover'}</div>
))

describe('<Home />', () => {
    it('should render', () => {
        expect.assertions(1)

        const { container } = render(<Home />)

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="mx-auto mt-20 max-w-screen-lg px-6"
              >
                BgRemover
              </div>
            </div>
        `)
    })
})
