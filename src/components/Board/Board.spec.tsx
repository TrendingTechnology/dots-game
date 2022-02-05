import { screen } from '@testing-library/react'

import renderWithTheme from '../../config/renderWithTheme'
import { GameBoard } from '../../interfaces'
import { theme } from '../../styles/theme'

import { Board } from './Board'

describe('Test the board component', () => {
  it('given the component rendering, when the board size is 2x2, then it must contain six horizontal lines and six vertical lines', async () => {
    const boardMock: GameBoard = [
      [undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined],
    ]

    renderWithTheme(<Board board={boardMock} />)

    const horizontalLines = await screen.findAllByLabelText('horizontal-line')
    expect(horizontalLines).toHaveLength(6)

    const verticalLines = await screen.findAllByLabelText('vertical-line')
    expect(verticalLines).toHaveLength(6)
  })

  it('given the component rendering, when the board size is 1x1 with first line is blue and second line is red, then it must colors in the lines', async () => {
    const boardMock: GameBoard = [['blue'], ['red', undefined], [undefined]]

    renderWithTheme(<Board board={boardMock} />)

    const horizontalLines = await screen.findAllByLabelText('horizontal-line')
    expect(horizontalLines).toHaveLength(2)

    const verticalLines = await screen.findAllByLabelText('vertical-line')
    expect(verticalLines).toHaveLength(2)

    const horizontalLine = horizontalLines[0]
    expect(horizontalLine).toHaveStyle(`background-color: ${theme.colors.blue}`)

    const verticalLine = verticalLines[0]
    expect(verticalLine).toHaveStyle(`background-color: ${theme.colors.red}`)
  })
})