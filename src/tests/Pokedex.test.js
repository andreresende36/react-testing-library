import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  const nextPokemonText = 'Próximo Pokémon';
  it('Testando se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const text = screen.getByRole('heading', { level: 2 });
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('Encountered Pokémon');
  });

  it('Testando se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextPokemonBtn = screen.getByRole('button', { name: nextPokemonText });
    expect(nextPokemonBtn).toBeInTheDocument();

    const testId = 'pokemon-name';
    pokemonList.forEach((pokemon) => {
      expect(screen.getByTestId(testId).textContent).toBe(pokemon.name);
      userEvent.click(nextPokemonBtn);
    });
    expect(screen.getByTestId(testId).textContent).toBe(pokemonList[0].name);
  });

  it('Testando se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const testId = 'pokemon-name';
    const nextPokemonBtn = screen.getByRole('button', { name: nextPokemonText });
    pokemonList.forEach(() => {
      expect(screen.getAllByTestId(testId)).toHaveLength(1);
      userEvent.click(nextPokemonBtn);
    });
  });

  it('Testando se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const testId = 'pokemon-type-button';
    const nextPokemonBtn = screen.getByRole('button', { name: nextPokemonText });
    const btnAll = screen.getByRole('button', { name: 'All' });
    const btnFilterArray = screen.getAllByTestId(testId);
    const typesArray = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typesArray2 = btnFilterArray.map((item) => item.textContent);
    expect(typesArray).toEqual(typesArray2);

    btnFilterArray.forEach((button) => {
      userEvent.click(button);
      pokemonList.forEach(() => {
        const pokemonType = screen.getByTestId('pokemon-type');
        expect(button.textContent).toBe(pokemonType.textContent);
        expect(btnAll).toBeInTheDocument();
        userEvent.click(nextPokemonBtn);
      });
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();

    const testId = 'pokemon-type';
    const nextPokemonBtn = screen.getByRole('button', { name: nextPokemonText });
    const type1 = screen.getByTestId(testId).textContent;
    userEvent.click(nextPokemonBtn);
    const type2 = screen.getByTestId(testId).textContent;
    expect(type1).not.toBe(type2);

    const testId2 = 'pokemon-type-button';
    const btnFilterArray = screen.getAllByTestId(testId2);
    userEvent.click(btnFilterArray[0]);
    userEvent.click(btnAll);
    const type3 = screen.getByTestId(testId).textContent;
    userEvent.click(nextPokemonBtn);
    const type4 = screen.getByTestId(testId).textContent;
    expect(type3).not.toBe(type4);
  });
});
