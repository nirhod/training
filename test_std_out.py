import sys

from std_out import stdout_redirect


def test_stdout_redirect_restore_stdout():
    old_stdout = sys.stdout
    with stdout_redirect():
        pass
    assert old_stdout == sys.stdout


def test_stdout_redirect_out():
    with stdout_redirect() as sio:
        print('hello world')
        sio.seek(0)
        stdout_redirected_output = sio.read()
    assert stdout_redirected_output == 'hello world\n'


def test_stdout_redirect_no_print(capfd):
    with stdout_redirect():
        print('hello world')
        print_out, err = capfd.readouterr()
    assert not print_out
