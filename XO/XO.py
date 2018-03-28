from typing import List, Union, Tuple
import random

N = 3
EMPTY = 'E'
PLAYERS_SIGNS = ['X', 'O']


def get_names() -> List[str]:
    inputs = []
    for i in range(2):
        inputs.append(input(f'Insert the name of player {i}\n'))
    return inputs


def get_action(current_player: str, board: List[list]) -> Tuple[int, int]:
    """
    Talks with the user and get an input which represents his move, verify that the move is valid.

    :param current_player: The name of the player which is playing now
    :param board: The board game before the player did his move
    :return: A tuple with the new position coordinates
    """
    error_message = 'Error'
    texts = (f'{current_player}, insert line number (0/1/2)\n', f'{current_player}, insert column number (0/1/2)\n')
    while error_message:
        inputs = [input(text) for text in texts]
        error_message = is_legal_position(inputs, board)
        if error_message:
            print(error_message)
    return int(inputs[0]), int(inputs[1])


def is_legal_position(position: List[str], board: List[list]) -> Union[str, None]:
    """
    Checks if the the coordinates of the game board are legal

    :param position: The inputs from the user
    :param board: A matrix which represents the game board
    :return: None if the position is legal, or message of the error if the position is not legal
    """
    for i, user_input in enumerate(position):
        if not user_input.isdecimal():
            return f'Error: input number {i} is not a number'
        if not 0 <= int(user_input) < N:
            return f'Error: input number {i} is not in range'
    if board[int(position[0])][int(position[1])] is not None:
        return 'Error: someone chose this position'


def print_board(board: List[list]):
    """
    Prints the current board game as a matrix (N+1)X(N+1)
    The first line and first column are the indexes and the inner cells can be: 'X'\'O'\'E'
    """
    print(' \t' + '\t'.join([str(i) for i in range(N)]))
    for line_index, line in enumerate(board):
        print_line = []
        for k, cell in enumerate(line):
            print_line.append(EMPTY if cell is None else PLAYERS_SIGNS[cell])
        print(f'{line_index}\t' + '\t'.join(print_line))


def _are_all_equal(l: list) -> bool:
    """
    false if there is None in l
    """
    return l[0] is not None and l.count(l[0]) == len(l)


def get_winner(board: List[list]) -> Union[int, None]:
    """
    Looks at the board and checks if there is a winner

    :param board: A matrix which represents the game board
    :return: Winner name, or None if there's no winner
    """
    # Check lines.
    for line in board:
        if _are_all_equal(line):
            return line[0]
    # Check columns.
    for line in zip(*board):
        if _are_all_equal(line):
            return line[0]
    # Check diagonals.
    if _are_all_equal([board[i][i] for i in range(N)]):
        return board[0][0]
    if _are_all_equal([board[i][N - 1 - i] for i in range(N)]):
        return board[0][N - 1]


def run_game():
    players = get_names()

    # Initialize variables
    turn_index = random.randint(0, 1)
    board = [[None] * N for i in range(N)]
    winner = None
    counter = 0
    # The game starts.
    while winner is None:
        if counter == N * N:
            print('There is no winner!')
            return
        print_board(board)
        new_position = get_action(players[turn_index], board)
        board[new_position[0]][new_position[1]] = turn_index
        turn_index = (turn_index + 1) % 2
        winner = get_winner(board)
        counter += 1
    print_board(board)
    print(f'The winner is: {players[winner]}')


if __name__ == '__main__':
    run_game()
