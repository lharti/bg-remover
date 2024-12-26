import {
    generateImageItemFromFile,
    generateImagesItemsFromFiles,
} from '@/libs/generateImageItemsFromFiles'

global.crypto.randomUUID = jest.fn().mockReturnValue('UUID')

global.URL.createObjectURL = jest.fn(
    (file: File) => `blob:http://test/${file.name}`,
)

describe('generateImageItemFromFile', () => {
    it('should generate ImageItem from File', () => {
        expect.assertions(1)

        const file = new File([], 'cat.png', {
            type: 'image/png',
        })

        const imageItem = generateImageItemFromFile(file)

        expect(imageItem).toMatchInlineSnapshot(`
            {
              "id": "UUID",
              "name": "cat",
              "original": "blob:http://test/cat.png",
              "status": "pending",
            }
        `)
    })
})

describe('generateImagesItemsFromFiles', () => {
    it('should generate ImageItems from Files', () => {
        expect.assertions(1)

        const files = [
            new File([], 'cat.png', {
                type: 'image/png',
            }),

            new File([], 'dog.jpg', {
                type: 'image/jpeg',
            }),
        ]

        const imageItems = generateImagesItemsFromFiles(files)

        expect(imageItems).toMatchInlineSnapshot(`
            [
              {
                "id": "UUID",
                "name": "cat",
                "original": "blob:http://test/cat.png",
                "status": "pending",
              },
              {
                "id": "UUID",
                "name": "dog",
                "original": "blob:http://test/dog.jpg",
                "status": "pending",
              },
            ]
        `)
    })
})
