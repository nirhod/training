from typing import List, Union, Tuple
import random

COLUMNS_NUMBER = 3
EMPTY_PRINT_SIGN = 'E'
PLAYERS_SIGNS = ['X', 'O']


def get_names() -> List[str]:
    return [input(f'Insert the name of player {i}\n') for i in range(2)]


def get_action(current_player: str, board: List[list]) -> Tuple[int, int]:
    """
    Talks with the user and get an input which represents his move, verify that the move is valid.

    :param current_player: The name of the player which is playing now
    :param board: The board game before the player did his move
    :return: A tuple with the new position coordinates
    """
    legal_input_flag = False
    column_options = '/'.join([str(i) for i in range(COLUMNS_NUMBER)])
    while not legal_input_flag:
        inputs = [input(f'{current_player}, insert line number ({column_options})\n'),
                  input(f'{current_player}, insert column number ({column_options})\n')]
        error_message = is_legal_position(inputs, board)
        legal_input_flag = False if error_message else True
        if not legal_input_flag:
            print(error_message)
    return inputs[0], inputs[1]


def is_legal_position(position: List[str], board: List[list]) -> Union[str, None]:
    """
    Checks if the the coordinates of the game board are legal and convert position to list of ints if possible

    :param position: The inputs from the user
    :param board: A matrix which represents the game board
    :return: None if the position is legal, or message of the error if the position is not legal
    """
    for i in range(len(position)):
        if not position[i].isdecimal():
            return f'Error: input number {i} is not a number'
        position[i] = int(position[i])
        if not 0 <= position[i] < COLUMNS_NUMBER:
            return f'Error: input number {i} is not in range'
    if board[position[0]][position[1]] is not None:
        return 'Error: someone chose this position'


def print_board(board: List[list]):
    """
    Prints the current board game as a matrix (N+1)X(N+1)
    The first line and first column are the indexes and the inner cells can be: 'X'\'O'\'E'

    :param board: A matrix which represents the game board
    """
    print(' \t' + '\t'.join([str(i) for i in range(COLUMNS_NUMBER)]))
    for line_index, line in enumerate(board):
        print_line = []
        for k, cell in enumerate(line):
            print_line.append(EMPTY_PRINT_SIGN if cell is None else PLAYERS_SIGNS[cell])
        print(f'{line_index}\t' + '\t'.join(print_line))


def _are_all_equal(l: list) -> bool:
    """
    Checks if all values in the list are equal, except when all values are None.

    :param l: list of the values
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
    for column in zip(*board):
        if _are_all_equal(column):
            return column[0]
    # Check diagonals.
    if _are_all_equal([board[i][i] for i in range(COLUMNS_NUMBER)]):
        return board[0][0]
    if _are_all_equal([board[i][COLUMNS_NUMBER - 1 - i] for i in range(COLUMNS_NUMBER)]):
        return board[0][COLUMNS_NUMBER - 1]


def run_game():
    players = get_names()

    # Initialize variables
    turn_index = random.randint(0, 1)
    board = [[None] * COLUMNS_NUMBER for i in range(COLUMNS_NUMBER)]
    winner = None
    counter = 0
    # The game starts.
    while winner is None:
        if counter == COLUMNS_NUMBER * COLUMNS_NUMBER:
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
