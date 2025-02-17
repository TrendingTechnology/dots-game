import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { SfxContext } from '../../contexts/SfxContext'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'
import { generateGameBySize } from '../../utils/GameUtils'

import { BoxSize, Container, ContainerBox } from './HomeLoggedStyle'

export function HomeLogged() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const { clickSfx, tickSfx } = useContext(SfxContext)
  const [gameSize, setGameSize] = useState('4x4')

  function handleClick(size: string) {
    clickSfx()
    setGameSize(size)
  }

  async function handleCreateGame() {
    clickSfx()
    const number = Number(gameSize.split('x')[0])
    const { board, marks } = generateGameBySize(number, number)

    const gameRef = database.ref('games')

    const game = {
      firstPlayer: {
        id: user?.id || '',
        name: user?.name || '',
        avatar: user?.avatar || {},
        pontuation: 0,
        isReady: false,
        color: '',
      },
      turn: 1,
      board,
      marks,
      isStarted: false,
    }

    const firebaseGame = await gameRef.push(game)

    navigate(`/${firebaseGame.key}/lobby`)
  }

  return (
    <Container>
      <ContainerBox>
        <BoxSize
          enabled={gameSize === '4x4'}
          onClick={() => handleClick('4x4')}
          onMouseEnter={() => tickSfx()}
        >
          4x4
        </BoxSize>
        <BoxSize
          enabled={gameSize === '6x6'}
          onClick={() => handleClick('6x6')}
          onMouseEnter={() => tickSfx()}
        >
          6x6
        </BoxSize>
        <BoxSize
          enabled={gameSize === '8x8'}
          onClick={() => handleClick('8x8')}
          onMouseEnter={() => tickSfx()}
        >
          8x8
        </BoxSize>
        <BoxSize
          enabled={gameSize === '10x10'}
          onClick={() => handleClick('10x10')}
          onMouseEnter={() => tickSfx()}
        >
          10x10
        </BoxSize>
      </ContainerBox>

      <Button color="red" onClick={handleCreateGame}>
        CREATE GAME
      </Button>
    </Container>
  )
}
