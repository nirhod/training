import cardinality  # You might need to do 'pip install cardinality'.
import time

PROGRESS_BAR_LEN = 20


class Tqdm(object):

    def __init__(self, iterable):
        self.iterable = iterable
        self.length = len(iterable) if hasattr(iterable, '__len__') else sum(1 for i in iterable)

    def __iter__(self):
        return TqdmIterator(iter(self.iterable), self.length)


class TqdmIterator(object):

    def __init__(self, iterator, length):
        self.start_time = None
        self.length = length
        self.iterator = iterator
        self.iter_index = 0

    def __next__(self):
        if self.start_time is None:
            self.start_time = time.time()
        print('\r' + self._get_progress_bar(), end='')
        self.iter_index += 1
        return next(self.iterator)

    def _get_progress_bar(self) -> str:
        percent = self.iter_index / self.length * 100
        passed = int(PROGRESS_BAR_LEN * (percent/100))

        hashtags = '#' * passed
        dots = '.' * (PROGRESS_BAR_LEN - passed)
        time_elapsed = time.time() - self.start_time
        iters_per_second = self.iter_index / time_elapsed
        return f'{self.iter_index}/{self.length} : {time_elapsed:.2f} : {iters_per_second:.2f} : {hashtags}{dots} : ' \
               f'{percent:.0f}%'
