import sys

from std_out import std_out_redirect


def test_stdout_redirect_restore_stdout():
    old_stdout = sys.stdout
    with std_out_redirect():
        pass
    assert old_stdout == sys.stdout


def test_stdout_redirect_out():
    with std_out_redirect() as sio:
        print('hello world')
        sio.seek(0)
        stdout_redirected_output = sio.read()
    assert stdout_redirected_output == 'hello world\n'


def test_stdout_redirect_no_print(capfd):
    with std_out_redirect():
        print('hello world')
        print_out, err = capfd.readouterr()
    assert not print_out
