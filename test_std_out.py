import pytest
import sys
from collections import namedtuple

from std_out import stdout_redirect


def test_stdout_redirect_restore_stdout():
    old_stdout = sys.stdout
    with stdout_redirect():
        pass
    assert old_stdout == sys.stdout


def test_stdout_redirect_out(use_stdout_redirect):
    assert use_stdout_redirect.stdout_redirect_out == 'hello world\n'


def test_stdout_redirect_no_print(use_stdout_redirect):
    assert not use_stdout_redirect.out


@pytest.fixture
def use_stdout_redirect(capfd):
    with stdout_redirect() as sio:
        print('hello world')
        out, err = capfd.readouterr()
        sio.seek(0)
        stdout_redirect_out = sio.read()
    Return = namedtuple('Return', ('out', 'stdout_redirect_out'))
    return Return(out, stdout_redirect_out)
