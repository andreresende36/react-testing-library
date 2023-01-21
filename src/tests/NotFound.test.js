import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente <NotFound.js />', () => {
  it('Testando se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const text = screen.getByRole('heading', { level: 2 });
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('Page requested not found');
  });

  it('Teste se a página mostra a imagem do Pikachu chorando', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img');
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.src).toBe(imgUrl);
  });
});
