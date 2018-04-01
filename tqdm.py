import time

PROGRESS_BAR_LEN = 20


class Tqdm:
    """
    Iterable that prints status of other iterable objects
    print examples:
        10/20 : 5.03 : 1.99 : ##########.......... : 50%
        9it : 6.78 : 1.33it/s
    Attributes:
        iterable: Iterable object to print his status
        length: The length extracted from iterable
    Methods:
        __init__
        __iter__
    """

    def __init__(self, iterable):
        """
        :param iterable: Iterable object to print his status
        """
        self.iterable = iterable
        self.length = len(self.iterable) if hasattr(self.iterable, '__len__') else None

    def __iter__(self):
        """
        :return: New iterator object
        """
        return TqdmIterator(iter(self.iterable), self.length)


class TqdmIterator:
    """
    Iterator that prints the status of other iterators
    print examples:
        10/20 : 5.03 : 1.99 : ##########.......... : 50%
        9it : 6.78 : 1.33it/s
    Attributes:
        start_time: When the iteration started
        length: The number of objects in the iterator
        iterator: The iterator to print his status
        iter_index: The index of the current value in the iterator
    Methods:
        __init__
        __next__
    """

    def __init__(self, iterator, length):
        """
        :param iterator: The iterator to print his status
        :param length: The number of objects in the iterator
        """
        self.start_time = None
        self.length = length
        self.iterator = iterator
        self.iter_index = 0

    def __next__(self):
        """
        Iterate over the Iterator and print his status
        :return: The next value of the iterator
        """
        if self.start_time is None:
            self.start_time = time.time()
        print('\r' + self._get_progress_bar(), end='')
        self.iter_index += 1
        return next(self.iterator)

    def _get_progress_bar(self) -> str:
        """
        :return: A string that represents the current status of the iterator
        """
        time_elapsed = time.time() - self.start_time
        iters_per_second = self.iter_index / time_elapsed
        if self.length:
            percent = (self.iter_index / self.length) * 100
            passed = int(PROGRESS_BAR_LEN * (percent/100))

            hashtags = '#' * passed
            dots = '.' * (PROGRESS_BAR_LEN - passed)
            return f'{self.iter_index}/{self.length} : {time_elapsed:.2f} : {iters_per_second:.2f} : {hashtags}{dots} : ' \
                   f'{percent:.0f}%'
        return f'{self.iter_index}it : {time_elapsed:.2f} : {iters_per_second:.2f}it/s'
