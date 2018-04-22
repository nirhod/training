import pytest
import pycalculator
import os


@pytest.fixture()
def temp_file(tmpdir):
    """
    :return: A path of a temp file that can be overwritten.
    """
    return os.path.join(tmpdir, 'temp_file.temp')


@pytest.mark.parametrize('dividend, divisor, quotient',
                         ((10, 2, 5)
                          , (-4, 2, -2)
                          , (4, -2, -2)
                          , (-5, -5, 1)
                          , (0, 5, 0)
                          , (2, 4, 0.5)))
def test_div(dividend, divisor, quotient):
    assert pycalculator.div(dividend, divisor) == quotient


@pytest.mark.parametrize('num1, num2, the_sum',
                         ((5, 10, 15)
                          , (-2, 2, 0)
                          , (5, -2, 3)
                          , (-2, -3, -5)))
def test_sum(num1, num2, the_sum):
    assert pycalculator.sum(num1, num2) == the_sum


def test_sum_too_large_exception():
    with pytest.raises(pycalculator.TooLargeException):
        pycalculator.sum(10011, 500)


@pytest.mark.parametrize('num', (5, -1, 0))
def test_save_load_number(num, temp_file):
    """
    Test both save_number and load_number.
    Can't divide it to two different tests because I can't know the inner implementation.
    """
    pycalculator.save_number(num, temp_file)
    assert pycalculator.load_number(temp_file) == num


@pytest.mark.xfail
def test_mul():
    assert pycalculator.mul(2, 6) == 18
