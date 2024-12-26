import { ImageViewer } from '@/components/ImageViewer'
import { render } from '@testing-library/react'

describe('<ImageViewer />', () => {
    it('should render image placeholder if there is no processed image', () => {
        expect.assertions(1)

        const { container } = render(
            <ImageViewer original="blob:http://test/orignal.jpg" name="Test" />,
        )

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="flex justify-center"
              >
                <div
                  class="relative overflow-hidden rounded-2xl mt-14"
                >
                  <img
                    alt="Image placeholder"
                    class="
                              max-h-[60vh]

                              animate-shift-filters
                            "
                    src="blob:http://test/orignal.jpg"
                  />
                  <div
                    class="
                              absolute inset-0 flex items-center justify-center bg-black/20
                            "
                  >
                    <svg
                      class="tabler-icon tabler-icon-loader-2 size-20 animate-spin text-white"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3a9 9 0 1 0 9 9"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
        `)
    })

    it('should render processed image with diff and download button', () => {
        expect.assertions(1)

        const { container } = render(
            <ImageViewer
                original="blob:http://test/orignal.jpg"
                processed="blob:http://test/processed.jpg"
                name="Test"
            />,
        )

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="flex flex-col items-center"
              >
                <a
                  aria-label="Download"
                  class="flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 mb-4"
                  download="Test-no-bg.png"
                  href="blob:http://test/processed.jpg"
                  rel="noreferrer"
                  role="button"
                  target="_blank"
                >
                  <svg
                    class="tabler-icon tabler-icon-download mr-2 size-5"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"
                    />
                    <path
                      d="M7 11l5 5l5 -5"
                    />
                    <path
                      d="M12 4l0 12"
                    />
                  </svg>
                  Download
                </a>
                <div
                  class="max-h-[60vh] cursor-ew-resize rounded-2xl"
                  position="100"
                  transition=".75s ease-in-out"
                >
                  <img
                    alt="before"
                    src="blob:http://test/orignal.jpg"
                  />
                  <img
                    alt="after"
                    src="blob:http://test/processed.jpg"
                  />
                </div>
              </div>
            </div>
        `)
    })
})
