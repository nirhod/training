class City:

    def __init__(self):
        self.neighborhoods = {}
        self.base_tax = 1000

    def build_a_neighborhood(self, neighborhood_name):
        pass

    def how_much_money(self):
        pass


class Neighborhood:
    """
    Represents a neighborhood in a city, should help calculate the tax of each neighborhood
    Attributes:
        name: The name of the neighborhood
        parks: How many parks are in the neighborhood
        houses: list of houses in the neighborhood
    Methods:
        build_a_house: Adds a new house to the neighborhood
        how_much_money: How much tax should the neighborhood pay, include base tax and houses tax
    """

    def __init__(self, name: str, parks: int=0):
        """
        :param name: The name of the neighborhood
        :param parks: How many parks are in the neighborhood
        """
        self.name = name
        self.parks = parks
        self.houses = []

    def build_a_house(self, family_members: int, size: int):
        """
        Adds a new house to the neighborhood
        :param family_members: Number of the family members
        :param size: The area of the house
        """
        self.houses.append(House(family_members, size))

    def how_much_money(self) -> int:
        """
        :return: How much tax should the neighborhood pay, include base tax and houses tax
        """
        return self.parks * 5 + len(self.houses) * 3 + sum([house.how_much_money() for house in self.houses])


class House:
    """
    Represents a house in a neighborhood, should help calculate the tax of each house
    Attributes:
        family_members: Number of the family members
        size: The area of the house
    Methods:
        how_much_money: how much tax should the house pay
    """

    def __init__(self, family_members: int, size: int):
        """
        :param family_members: Number of the family members
        :param size: The area of the house
        """
        self.family_members = family_members
        self.size = size

    def how_much_money(self) -> int:
        """
        :return: how much tax should the house pay
        """
        return self.size * self.family_members


if __name__ == '__main__':
    print('hi')