class Node:
    """
    Represents a node in MyList object
    """
    def __init__(self, data, next_node=None):
        self.next_node = next_node
        self.data = data

    def __repr__(self):
        next_data = self.next_node.data if self.next_node else None
        return f'{self.data} -> {next_data}'


class MyList:
    """
    MyList objects have all the methods as list objects
    """

    def __init__(self):
        self.length = 0
        self.first_node = None

    def __len__(self):
        return self.length

    def __iter__(self):
        return NodeIterator(self)

    def __getitem__(self, key: int):
        return self._get_node(key).data

    def __add__(self, other):
        """
        :param other: Iterable object to concatenate
        :return: A new MyList object that includes self and other concatenated
        """
        extended = self.copy()
        extended.extend(other)
        return extended

    def _get_node(self, key: int) -> Node:
        """
        Find the node correspond to key

        :param key: The index in list of the requested Node
        :return: Node in the position of key
        """
        if key >= len(self):
            raise IndexError('list index is out of range')
        current = self.first_node
        i = 0
        while current:
            if i == key:
                return current
            i += 1
            current = current.next_node

    def append(self, value):
        if len(self) == 0:
            self.first_node = Node(value)
        else:
            self._get_node(len(self) - 1).next_node = Node(value)
        self.length += 1

    def count(self, value):
        return sum(1 for i in self if i == value)

    def index(self, value):
        for i, current_value in enumerate(self):
            if current_value == value:
                return i
        raise ValueError(f'{value} is not in list')

    def clear(self):
        self.first_node = None
        self.length = 0

    def copy(self):
        new = MyList()
        for value in self:
            new.append(value)
        return new

    def extend(self, other):
        for i in other:
            self.append(i)

    def insert(self, index: int, value):
        if index == 0:
            self.first_node = Node(value, self.first_node)
        else:
            prev_node = self._get_node(index - 1)
            prev_node.next_node = Node(value, prev_node.next_node)
        self.length += 1

    def pop(self, index: int):
        if index == 0:
            pop_node = self.first_node
            self.first_node = self.first_node.next_node
        else:
            prev_node = self._get_node(index - 1)
            pop_node = prev_node.next_node
            prev_node.next_node = pop_node.next_node
        self.length -= 1
        return pop_node.data

    def remove(self, value):
        index = self.index(value)
        self.pop(index)

    def reverse(self):
        new = MyList()
        for i in range(len(self) - 1, -1, -1):
            new.append(self[i])
        self.first_node = new.first_node

    def sort(self):
        """
        Sorting the list using Bubble Sort algorithm in place
        """
        if len(self) == 0:
            return
        swap_occurred = True
        current_node = self.first_node
        while swap_occurred:
            swap_occurred = False
            while current_node.next_node:
                next_node = current_node.next_node
                if current_node.data > next_node.data:
                    swap_occurred = True
                    next_node_data = next_node.data
                    next_node.data = current_node.data
                    current_node.data = next_node_data
                current_node = next_node
            current_node = self.first_node

    def __repr__(self):
        repr_string = '['
        for i, value in enumerate(self):
            if i < len(self) - 1:
                repr_string += f'{value}, '
            else:
                repr_string += f'{value}'
        repr_string += ']'
        return repr_string

    def __str__(self):
        return self.__repr__()


class NodeIterator:
    """
    Iterator that iterate over Node objects in MyList object
    """

    def __init__(self, my_list: MyList):
        """
        :param my_list: The object to iterate
        """
        self.current = my_list.first_node

    def __next__(self):
        """
        :return: The data of the next node
        """
        if not self.current:
            raise StopIteration()
        current = self.current
        self.current = self.current.next_node
        return current.data


if __name__ == '__main__':
    # small tests
    l = MyList()
    print(dir(l))
    print(set(dir(list)) - set(dir(l)))
    l.append('b')
    l.append('a')
    l.append('c')
    l.append('a')
    print(l)  # [a, b, c, a]
    l.sort()
    print(l)
    l3 = MyList()
    import random
    for i in range(30):
        l3.append(random.randint(0, 400))
    print(l3)
    l3.sort()
    print(l3)
    l4 = MyList()
    l4.sort()  # make sure no exception
    l4.append('a')
    l4.sort()
    print(l4)   # ['a']
    l2 = l.copy()  # make sure no exception
    print(l2 is l)  # False
    print(l2)  # [a, b, c, a]
    l2.clear()
    print(l2)  # []
    print(l.count('a'))  # 2
    print(l.count('aaaa'))      # 0
    l.extend(['d', 'e'])
    print(l)  # [abcade]
    print(l.index('d'))  # 4
    l.insert(0, 'i')
    l.insert(3, 'i')  # ['i', 'a', 'b', 'i', 'c', 'a', 'd', 'e']
    print(l)
    l.pop(0)
    l.pop(2)
    print(l)  # ['a', 'b', 'c', 'a', 'd', 'e']
    l.remove('b')
    l.remove('a')
    print(l)  # ['c', 'a', 'd', 'e']
    l.reverse()
    print(l)  # ['e', 'd', 'a', 'c']
    l.sort()
    print(l)  # ['a', 'c', 'd', 'e']
