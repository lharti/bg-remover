import { DownloadButton } from '@/components/ui/DownloadButton'
import { render } from '@testing-library/react'

describe('<DownloadButton />', () => {
    it('should render', () => {
        const url = 'blob:https://example.com/file.pdf'
        const name = 'file.pdf'

        const { container } = render(
            <DownloadButton url={url} name={name} className={`bg-red-400`} />,
        )

        expect(container).toMatchInlineSnapshot(`
            <div>
              <a
                aria-label="Download"
                class="flex items-center justify-center rounded px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 bg-red-400"
                download="file.pdf"
                href="blob:https://example.com/file.pdf"
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
            </div>
        `)
    })
})
