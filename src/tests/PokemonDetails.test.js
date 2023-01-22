import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const linkText = 'More details';
const testIdName = 'pokemon-name';

describe('Testando o componente <PokemonDetails.js />', () => {
  it('Testando se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: linkText });
    userEvent.click(link);
    const name = screen.getByTestId(testIdName).textContent;
    const title = screen.getByText(`${name} Details`);
    expect(title).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: linkText })).not.toBeInTheDocument();
    const headingArray = screen.getAllByRole('heading', { level: 2 });
    const heading = headingArray.find((item) => item.textContent === 'Summary');
    expect(heading).toBeInTheDocument();
    const pokemonObj = pokemonList.find((item) => item.name === name);
    const summary = screen.getByText(pokemonObj.summary);
    expect(summary).toBeInTheDocument();
  });

  it('Testando se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: linkText });
    userEvent.click(link);
    const name = screen.getByTestId(testIdName).textContent;
    const headingArray = screen.getAllByRole('heading', { level: 2 });
    const heading = headingArray.find((item) => item.textContent
      === `Game Locations of ${name}`);
    expect(heading).toBeInTheDocument();

    const pokemonObj = pokemonList.find((item) => item.name === name);
    const locations = pokemonObj.foundAt.map((item) => item.location);
    locations.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
    const maps = pokemonObj.foundAt.map((item) => item.map);
    const maps2 = screen.getAllByAltText(`${name} location`);
    maps.forEach((item, index) => {
      expect(item).toBe(maps2[index].src);
    });
  });

  it('Testando se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId(testIdName).textContent;
    const link = screen.getByRole('link', { name: linkText });
    userEvent.click(link);

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    const star = screen.getByAltText(`${name} is marked as favorite`);
    expect(star).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(star).not.toBeInTheDocument();
  });
});
