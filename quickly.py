import datetime


def timer(func):
    """
    Generator that runs func and measures the run time.
    Each time timer will be called the average time will be more accurate.

    :param func: A function to measure it's run time.
    :return: Average run time of func.
    """
    counter = 0
    time_elapsed_avg = 0
    times = None
    while True:
        times = times if times else 1
        for i in range(times):
            start = datetime.datetime.now()
            func()
            end = datetime.datetime.now()
            time_elapsed = end - start
            counter += 1
            time_elapsed_avg = (time_elapsed_avg * ((counter - 1) / counter)) + (time_elapsed.total_seconds() / counter)
        times = yield time_elapsed_avg
