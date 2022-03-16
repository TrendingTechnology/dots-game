import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Container = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 5rem;

  width: 100vw;
  height: 100vh;

  background-color: ${(props) => props.theme.colors.primary};
`
