from quickly import timer
from time import sleep
import pytest


EPSILON = 0.01
TENTH_SECOND = 0.1


def test_timer_once(timer_gen):
    assert is_timer_tenth_second(timer_gen)


def test_timer_many_times(timer_gen):
    for i in range(14):
        next(timer_gen)
    assert is_timer_tenth_second(timer_gen)


def test_timer_send_many_times(timer_gen):
    next(timer_gen)
    timer_gen.send(14)
    assert is_timer_tenth_second(timer_gen)


def sleep_tenth_second():
    sleep(TENTH_SECOND)


def is_timer_tenth_second(used_timer_gen):
    return TENTH_SECOND - EPSILON < next(used_timer_gen) < TENTH_SECOND + EPSILON


@pytest.fixture
def timer_gen():
    return timer(sleep_tenth_second)
