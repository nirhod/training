import pytest
import pycalculator
import pickle
import os


@pytest.fixture()
def temp_file(tmpdir):
    """
    :return: A path of a temp file that can be overwritten
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
@pytest.mark.xfail
def test_sum(num1, num2, the_sum):
    assert pycalculator.sum(num1, num2) == the_sum


@pytest.mark.parametrize('num', (5, -1))
@pytest.mark.xfail
def test_save_number(num, temp_file):
    pycalculator.save_number(num, temp_file)
    with open(temp_file, 'rb') as num_file:
        assert pickle.load(num_file) == num


@pytest.mark.parametrize('num', (5, -1))
def test_load_number(num, temp_file):
    with open(temp_file, 'wb') as num_file:
        pickle.dump(num, num_file)
    assert pycalculator.load_number(temp_file)
