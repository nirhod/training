import pytest

from genesis import word_gen


def test_word_gen_no_send(word_gen_generator):
    assert next(word_gen_generator) == 'a'
    assert next(word_gen_generator) == 'accurate'


def test_word_gen_with_send(word_gen_generator):
    next(word_gen_generator)
    assert word_gen_generator.send('eastern') == 'eastern'
    assert word_gen_generator.send('f') == 'far'


@pytest.fixture()
def word_gen_generator():
    return word_gen()

