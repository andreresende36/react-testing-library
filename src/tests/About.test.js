import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente <About.js />', () => {
  it('Testando se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokedex = 'About Pokédex';
    expect(screen.getByText(aboutPokedex)).toBeInTheDocument();
  });

  it('Testando se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('Testando se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraphsArray = screen.getAllByTestId('info-pokedex');
    expect(paragraphsArray.length).toBe(2);
  });

  it('Testando se a página contém uma imagem específica de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(imgUrl);
  });
});
