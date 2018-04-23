
def word_gen():
    letters = None
    for line in open('words.txt', 'r'):
        if not letters or letters <= line[:len(letters)]:
            letters = yield line[:-1]
