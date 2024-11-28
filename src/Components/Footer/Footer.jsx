import * as React from 'react';
import { Box, Typography, Link, styled } from '@mui/material';

const Text = styled(Typography)({
  fontSize: '1em',
  color: '#707080',
});

// Cria um componente de botão de texto estilizado para links
const TextButton = styled(Link)({
  color: '#606070', // Define a cor do texto com opacidade
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif', // Define a fonte
  fontWeight: 700, // Define o peso da fonte como negrito
  fontSize: '0.90em', // Define o tamanho da fonte
  whiteSpace: 'pre-wrap', // Mantém as quebras de linha e espaços em branco
  alignSelf: 'baseline', // Alinha-se à linha de base
  position: 'relative', // Necessário para o posicionamento dos pseudo-elementos
  overflow: 'hidden', // Oculta conteúdo que ultrapassa o tamanho do elemento
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer', // Muda o cursor para indicar que é clicável ao passar o mouse
  },
  '&::after': {
    content: '""', // Cria um pseudo-elemento vazio
    position: 'absolute', // Posição absoluta para controlar a posição
    bottom: 0, // Alinha na parte inferior
    left: 0, // Alinha à esquerda
    width: '100%', // Largura total do elemento
    height: '0.05em', // Altura da linha inferior
    backgroundColor: '#606070', // Cor da linha com opacidade
    opacity: 1, // Opacidade total
    transform: 'translate3d(-100%, 0, 0)', // Move a linha para fora à esquerda
    transition: 'cubic-bezier(0.4, 0, 0.25, 0.6) 500ms', // Transição suave para o efeito hover
  },
  '&:hover::after': {
    transform: 'translate3d(0, 0, 0)', // Move a linha para a posição original ao passar o mouse ou focar
  },
});

const StyledFooter = styled(Box)({
  margin: '15px 0 15px 0',
  transform: 'translateX(-50%)',
  left: '50%',
  position: 'absolute',
  bottom: 0,
});

export default function Footer() {
  return (
    <StyledFooter>
      <Text
        sx={{
          display: 'flex',
        }}
      >
        Feito por &nbsp;
        <TextButton
          href='https://github.com/Zyvoxi'
          target='_blank'
          rel='noopener noreferrer'
        >
          Zyvoxi
        </TextButton>
      </Text>
    </StyledFooter>
  );
}
