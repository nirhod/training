import time
from inspect import isgenerator

PROGRESS_BAR_LEN = 20


class Tqdm(object):
    """
    Iterable that prints status of other iterable objects
    """

    def __init__(self, iterable):
        """
        :param iterable: Iterable object (has the method __iter__) to print his status
        """
        self.iterable = iterable if not isgenerator(iterable) else list(iterable)
        self.length = len(self.iterable) if hasattr(self.iterable, '__len__') else sum(1 for i in self.iterable)

    def __iter__(self):
        """
        :return: New iterator object (has the method __next__)
        """
        return TqdmIterator(iter(self.iterable), self.length)


class TqdmIterator(object):
    """
    Iterator that prints the status of other iterators
    """

    def __init__(self, iterator, length):
        """
        :param iterator: The iterator (has the method __next__) to print his status
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
        percent = (self.iter_index / self.length) * 100
        passed = int(PROGRESS_BAR_LEN * (percent/100))

        hashtags = '#' * passed
        dots = '.' * (PROGRESS_BAR_LEN - passed)
        time_elapsed = time.time() - self.start_time
        iters_per_second = self.iter_index / time_elapsed
        return f'{self.iter_index}/{self.length} : {time_elapsed:.2f} : {iters_per_second:.2f} : {hashtags}{dots} : ' \
               f'{percent:.0f}%'
