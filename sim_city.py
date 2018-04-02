class City:
    """
    Represents a city in Ackland, should help calculate the tax of each city
    """

    def __init__(self):
        self.neighborhoods = {}
        self.base_tax = 1000

    def add_new_neighborhood(self, neighborhood_name: str):
        """
        Creates a new neighborhood in the city
        :param neighborhood_name: the name of the neighborhood
        """
        self.neighborhoods[neighborhood_name] = Neighborhood()
        self.base_tax *= 1.1

    def add_new_house(self, neighborhood_name: str, family_members: int, size: int):
        """
        Creates a new house in a specific neighborhood in the city
        :param neighborhood_name: the name of the neighborhood
        :param family_members: Number of the family members
        :param size: The area of the house
        """
        self.neighborhoods[neighborhood_name].add_new_house(family_members, size)

    def remove_neighborhood(self, neighborhood_name: str):
        """
        Destroy a neighborhood in the city
        :param neighborhood_name: the name of the neighborhood
        """
        self.neighborhoods.pop(neighborhood_name)
        self.base_tax *= 1.05

    def add_new_park(self, neighborhood_name: str):
        """
        Create a park in a specific neighborhood in the city
        :param neighborhood_name: the name of the neighborhood
        """
        self.neighborhoods[neighborhood_name].parks += 1

    def all_tax(self):
        """
        :return: How much tax should the city pay. include base tax, neighborhoods taxes and houses taxes
        """
        return self.base_tax + sum([neighborhood.all_tax() for neighborhood in self.neighborhoods.values()])


class Neighborhood:
    """
    Represents a neighborhood in a city, should help calculate the tax of each neighborhood
    """

    def __init__(self, parks: int=0):
        """
        :param parks: How many parks are in the neighborhood
        """
        self.parks = parks
        self.houses = []

    def add_new_house(self, family_members: int, size: int):
        """
        Adds a new house to the neighborhood
        :param family_members: Number of the family members
        :param size: The area of the house
        """
        self.houses.append(House(family_members, size))

    def all_tax(self) -> int:
        """
        :return: How much tax should the neighborhood pay, include base tax and houses taxes
        """
        return ((self.parks * 5)
                + (len(self.houses) * 3)
                + sum([house.all_tax() for house in self.houses]))


class House:
    """
    Represents a house in a neighborhood, should help calculate the tax of each house
    """

    def __init__(self, family_members: int, size: int):
        """
        :param family_members: Number of the family members
        :param size: The area of the house
        """
        self.family_members = family_members
        self.size = size

    def all_tax(self) -> int:
        """
        :return: how much tax should the house pay
        """
        return self.size * self.family_members


if __name__ == '__main__':
    synville = City()
    print(synville.all_tax())  # 1000
    synville.add_new_neighborhood('TA')
    print(synville.all_tax())  # 1100
    synville.add_new_park('TA')
    synville.add_new_park('TA')
    print(synville.all_tax())  # 1110
    synville.add_new_neighborhood('RG')
    print(synville.all_tax())
    synville.add_new_house('TA', 5, 2)
    print(synville.all_tax())
    synville.add_new_house('TA', 5, 2)
    print(synville.all_tax())
    synville.add_new_house('RG', 2, 5)
    print(synville.all_tax())  # 1259
    synville.remove_neighborhood('RG')
    print(synville.all_tax())  # 1306.5

