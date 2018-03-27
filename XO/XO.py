
import random

N = 3
EMPTY = "E"
PLAYERS_SIGNS = ["X", "O"]


def get_names():
    """
    :return: {"X": input1, "O": input2}
    :rtype: dict
    """
    texts = ["Insert the name of player 0\n", "Insert the name of player 1\n"]
    names = get_user_inputs(texts)
    return {PLAYERS_SIGNS[0]: names[0], PLAYERS_SIGNS[1]: names[1]}


def get_action(current_player, board):
    """
    :type current_player: str
    :return: list[0]=line number, list[1]=column number
    :rtype: list of ints
    """
    texts = [current_player + ", insert line number (0/1/2)\n", current_player + ", insert column number (0/1/2)\n"]
    inputs = get_user_inputs(texts)
    if not is_legal_position(inputs, board):
        print("the input is not legal!")
        inputs = get_action(current_player, board)
    return [int(i) for i in inputs]


def is_legal_position(position, board):
    """
    :type position: list of str
    :param position: the inputs from the user
    :rtype: bool
    """
    for input1 in position:
        if not input1.isdecimal() or int(input1) < 0 or int(input1) >= N:
            return False
    return board[int(position[0])][int(position[1])] == EMPTY


def get_user_inputs(texts):
    """
    :type texts: list of str
    :param texts: list of outputs for the user
    :return: list of inputs from the user
    :rtype: list
    """
    inputs = []
    for text in texts:
        inputs.append(input(text))
    return inputs


def print_board(board):
    """
    :type board: list of lists
    :return: None
    """
    for line in board:
        print("\t".join(line))


def are_all_equal(l):
    """
    if empty cell in l: return false
    :type l: list
    :rtype: bool
    """
    return l[0] != EMPTY and l.count(l[0]) == len(l)


def get_winner(board):
    """
    :type board: list of lists
    :return: winner name, if there isn't a winner: return None
    :rtype: str or None
    """
    # check lines
    for line in board:
        if are_all_equal(line):
            return line[0]
    # check columns
    for line in zip(*board):
        if are_all_equal(line):
            return line[0]
    # check diagonals
    if are_all_equal([board[i][i] for i in range(N)]):
        return board[0][0]
    elif are_all_equal([board[i][N - 1 - i] for i in range(N)]):
        return board[0][N - 1]
    else:
        return None


def run_game():
    players = get_names()

    # initialize variables
    turn_index = random.randint(0, 1)
    board = [[EMPTY] * N for i in range(N)]
    winner = None
    counter = 0
    # the game starts
    while winner is None:
        if counter == N * N:
            print("there is no winner!")
            return
        print_board(board)
        new_position = get_action(players[PLAYERS_SIGNS[turn_index]], board)
        board[new_position[0]][new_position[1]] = PLAYERS_SIGNS[turn_index]
        turn_index = (turn_index + 1) % 2
        winner = get_winner(board)
        counter += 1
    print_board(board)
    print("the winner is: ", players[winner])


if __name__ == "__main__":
    run_game()
