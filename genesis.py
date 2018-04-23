
def word_gen():
    """
    :return: The next word in words.txt which is after the letters (dictionary index) sent to word_gen,
                default next word is the word in the following line.
    """
    dictionary_index = None
    for line in open('words.txt', 'r'):
        if not dictionary_index or dictionary_index <= line:
            dictionary_index = yield line[:-1]
