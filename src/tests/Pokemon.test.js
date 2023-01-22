import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const testIdName = 'pokemon-name';
const linkText = 'More details';

describe('Testando o componente <Pokemon.js />', () => {
  it('Testando se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId(testIdName);
    expect(name).toBeInTheDocument();
    expect(name.textContent).toBe(pokemonList[0].name);

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type.textContent).toBe(pokemonList[0].type);

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();

    const { averageWeight: { value, measurementUnit } } = pokemonList[0];
    expect(weight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);

    const image = screen.getByAltText(`${name.textContent} sprite`);
    const imgUrl = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(imgUrl);
  });

  it('Testando se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: linkText });
    expect(link.href).toContain(`/pokemon/${pokemonList[0].id}`);
  });

  it('Testando se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon / Testando também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: linkText });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${pokemonList[0].id}`);
    const id = Number(pathname.slice(9, 11));
    const name = screen.getByTestId(testIdName);
    const pokemon = pokemonList.find((item) => item.id === id);
    expect(name.textContent).toBe(pokemon.name);
  });

  it('Testando se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId(testIdName).textContent;
    userEvent.click(screen.getByRole('link', { name: linkText }));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    const star = screen.getByAltText(`${name} is marked as favorite`);
    expect(star).toBeInTheDocument();
    expect(star.src).toContain('/star-icon.svg');
  });
});
