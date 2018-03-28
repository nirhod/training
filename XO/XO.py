from typing import List, Union, Tuple
import random

N = 3
EMPTY = 'E'
PLAYERS_SIGNS = ['X', 'O']


def get_names() -> List[str]:
    """
    :return: [input0, input1]
    """
    texts = ('Insert the name of player 0\n', 'Insert the name of player 1\n')
    inputs = []
    for text in texts:
        inputs.append(input(text))
    return inputs


def get_action(current_player: str, board: List[list]) -> Tuple[int, int]:
    """
    :return: list[0]=line number, list[1]=column number
    """
    texts = (f'{current_player}, insert line number (0/1/2)\n', f'{current_player}, insert column number (0/1/2)\n')
    inputs = []
    for text in texts:
        inputs.append(input(text))
    error_message = is_legal_position(inputs, board)
    if error_message is not None:
        print(error_message)
        inputs = get_action(current_player, board)
    return int(inputs[0]), int(inputs[1])


def is_legal_position(position: List[str], board: List[list]) -> Union[str, None]:
    """
    :param position: the inputs from the user
    :return: None if legal position, else: return message of the error
    """
    error_message = 'error: input number {index} is {error}'
    for i, user_input in enumerate(position):
        if not user_input.isdecimal():
            return error_message.format(index=i, error='not a number')
        if int(user_input) < 0 or int(user_input) >= N:
            return error_message.format(index=i, error='not in range')
    if board[int(position[0])][int(position[1])] is not None:
        return 'error: someone chose this position'


def print_board(board: List[list]):
    print(' \t' + '\t'.join([str(i) for i in range(N)]))
    for line_index, line in enumerate(board):
        print_line = []
        for k, cell in enumerate(line):
            print_line.append(EMPTY if cell is None else PLAYERS_SIGNS[cell])
        print(f'{line_index}\t' + '\t'.join(print_line))


def _are_all_equal(l: Union[list, tuple]) -> bool:
    """
    if empty cell in l: return false
    """
    return l[0] is not None and l.count(l[0]) == len(l)


def get_winner(board: List[list]) -> Union[int, None]:
    """
    :return: winner name, if there isn't a winner: return None
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
            print('there is no winner!')
            return
        print_board(board)
        new_position = get_action(players[turn_index], board)
        board[new_position[0]][new_position[1]] = turn_index
        turn_index = (turn_index + 1) % 2
        winner = get_winner(board)
        counter += 1
    print_board(board)
    print('the winner is: ', players[winner])


if __name__ == '__main__':
    run_game()
