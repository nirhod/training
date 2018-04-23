import io
import sys


class stdout_redirect:
    """
    A context manager that redirect the prints of stdout to itself.

    Usage example:
    with stdout_redirect() as sio:
        print('Hello world')  # No print to screen.
        sio.seek(0)
        string = sio.read()
    print(string.read())  # 'Hello world' will be printed.
    """

    def __enter__(self):
        self.old_stdout = sys.stdout
        sys.stdout = io.StringIO()
        return sys.stdout

    def __exit__(self, exc_type, exc_value, traceback):
        sys.stdout = self.old_stdout
