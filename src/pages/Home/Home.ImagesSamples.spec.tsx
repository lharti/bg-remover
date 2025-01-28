import { ImagesSamples } from '@/pages/Home/Home.ImagesSamples'
import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

global.fetch = jest.fn().mockResolvedValue({
    blob: () => new Blob(),
})

// const fetchMock = global.fetch as jest.Mock

describe('<ImagesSamples>', () => {
    it('should load sample image when clicked', async () => {
        expect.assertions(1)

        const user = userEvent.setup()

        const onSampleClick = jest.fn()
        render(<ImagesSamples onSampleClick={onSampleClick} />)

        const elm = screen.getByLabelText('Select sample image: person')

        await user.click(elm)
        expect(onSampleClick.mock.calls).toMatchInlineSnapshot(`
            [
              [
                File {},
              ],
            ]
        `)
    })

    it('should render ', () => {
        expect.assertions(1)

        const { container } = render(
            <ImagesSamples onSampleClick={jest.fn()} />,
        )

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="mt-10 space-y-4 text-center"
              >
                <p
                  class="font-bold"
                >
                  No images? Try one of these:
                </p>
                <div
                  class="flex justify-center gap-4"
                >
                  <button
                    aria-label="Select sample image: person"
                    class="hover:opacity-80"
                    role="button"
                  >
                    <img
                      alt="person"
                      class="w-40 rounded-lg object-cover shadow-lg"
                      src="https://assets.lharti.com/bg/samples/sm/person.jpg"
                    />
                  </button>
                  <button
                    aria-label="Select sample image: object"
                    class="hover:opacity-80"
                    role="button"
                  >
                    <img
                      alt="object"
                      class="w-40 rounded-lg object-cover shadow-lg"
                      src="https://assets.lharti.com/bg/samples/sm/object.jpg"
                    />
                  </button>
                  <button
                    aria-label="Select sample image: animal"
                    class="hover:opacity-80"
                    role="button"
                  >
                    <img
                      alt="animal"
                      class="w-40 rounded-lg object-cover shadow-lg"
                      src="https://assets.lharti.com/bg/samples/sm/animal.jpg"
                    />
                  </button>
                </div>
              </div>
            </div>
        `)
    })
})
