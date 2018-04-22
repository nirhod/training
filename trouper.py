from math import ceil


class Number(int):
    """
    Saves a number and shows the number's divisors.
    """

    def __new__(cls, number):
        return super().__new__(cls, number)

    def __init__(self, number: int):
        self.divisors = [divisor for divisor in range(1, ceil(number / 2)) if number % divisor == 0]

    def __getitem__(self, index):
        return self.divisors[index]

    def __contains__(self, item):
        return self % item == 0
