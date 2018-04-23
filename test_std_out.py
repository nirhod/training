import pytest

from std_out import stdout_redirect


def test_stdout_redirect(capfd):
    print('hello world')
    # out, err = capfd.readouterr()
    x = 1
    assert False