import pickle


def div(dividend: int, divisor: int):
    """
    Calculate the division of two numbers.
    The dividend is divided by the divisor to get a quotient.

    :return: the quotient.
    """
    return dividend / divisor


def sum(num1: int, num2: int):
    """
    Calculate the sum of two numbers.

    :return: The sum of num1 and num2.
    """
    return num1 + num2


def save_number(num: int, path: str):
    """
    Saves the number in the path as a pickle file.

    :param num: The number to save.
    :param path: Where to save the number.
    """
    with open(path, 'wb') as num_file:
        pickle.dump(num, num_file)


def load_number(path):
    """
    Load a number saved as pickle file.

    :param path: Where the number was saved.
    :return: The number in the path.
    """
    with open(path, 'rb') as num_file:
        return pickle.load(num_file)
