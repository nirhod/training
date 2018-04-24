import datetime
from time import sleep
import pytest

from quickly import timer


EPSILON = 0.01
TENTH_SECOND = 0.1


def test_timer_once(timer_gen):
    start = datetime.datetime.now()
    timer_avg_time = next(timer_gen)
    real_avg_time = (datetime.datetime.now() - start).total_seconds()
    assert is_timer_time_eq_real_time(timer_avg_time, real_avg_time)


def test_timer_many_times(timer_gen):
    start = datetime.datetime.now()
    for i in range(14):
        next(timer_gen)
    timer_avg_time = next(timer_gen)
    real_avg_time = (datetime.datetime.now() - start).total_seconds() / 15
    assert is_timer_time_eq_real_time(timer_avg_time, real_avg_time)


def test_timer_send_many_times(timer_gen):
    next(timer_gen)
    start = datetime.datetime.now()
    timer_avg_time = timer_gen.send(15)
    real_avg_time = (datetime.datetime.now() - start).total_seconds() / 15
    assert is_timer_time_eq_real_time(timer_avg_time, real_avg_time)


def sleep_tenth_second():
    sleep(TENTH_SECOND)


def is_timer_time_eq_real_time(timer_avg_time, real_avg_time):
    return real_avg_time - EPSILON < timer_avg_time < real_avg_time + EPSILON


@pytest.fixture
def timer_gen():
    return timer(sleep_tenth_second)
