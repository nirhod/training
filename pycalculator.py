

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
    if num1 > 10000 or num2 > 10000:
        # This exception is raised as an example for pytest.raises.
        raise TooLargeException
    return num1 + num2


def save_number(num: int, path: str):
    """
    Saves the number in the path as a pickle file.

    :param num: The number to save.
    :param path: Where to save the number.
    """
    with open(path, 'w') as num_file:
        num_file.write(str(num))


def load_number(path):
    """
    Load a number saved as pickle file.

    :param path: Where the number was saved.
    :return: The number in the path.
    """
    with open(path, 'r') as num_file:
        return int(num_file.read())


class TooLargeException(Exception):
    """
    Raised when the value is too large for pycalculator.
    """
    pass
