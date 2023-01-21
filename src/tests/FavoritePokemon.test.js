import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Testando o componente <FavoritePokemon.js />', () => {
  it('Testando se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const notFoundText = screen.getByText('No favorite Pokémon found');
    expect(notFoundText).toBeInTheDocument();
  });

  it('Testando se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const testId = 'pokemon-name';

    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    const pokemon1 = screen.getByTestId(testId).textContent;
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: 'Home' }));
    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    const pokemon2 = screen.getByTestId(testId).textContent;
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémon' }));
    const favorites = screen.getAllByTestId(testId);
    expect(favorites[0]).toHaveTextContent(pokemon1);
    expect(favorites[1]).toHaveTextContent(pokemon2);
    expect(favorites.length).toBe(2);
  });
});
