class TypeWriter {
    constructor(typeWriterEl, words, typeSpeed = 150, deleteSpeed = 75, delay = 3000) {
        this.typeWriterEl = typeWriterEl;
        this.words = words;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.delay = delay;
        this.currentWordIndex = 0;
        this.currentLetterIndex = 0;
        this.text = "";
        this.type();
    }

    type = () => {
        const { typeWriterEl, words, typeSpeed, delay, currentWordIndex } = this;
        const currentWord = words[currentWordIndex];
        const timer = setInterval(() => {
            this.text += currentWord[this.currentLetterIndex];
            typeWriterEl.textContent = this.text;
            if (this.currentLetterIndex >= currentWord.length - 1) {
                clearInterval(timer);
                setTimeout(() => {
                    this.delete();
                }, delay);
            } else {
                this.currentLetterIndex++;
            }
        }, typeSpeed);
    };

    delete = () => {
        const { typeWriterEl, deleteSpeed } = this;
        const timer = setInterval(() => {
            this.text = this.text.slice(0, this.text.length - 1);
            typeWriterEl.textContent = this.text;
            if (this.currentLetterIndex <= 0) {
                if (this.currentWordIndex >= this.words.length - 1) {
                    this.currentWordIndex = 0;
                } else {
                    this.currentWordIndex++;
                }
                clearInterval(timer);
                this.type();
            } else {
                this.currentLetterIndex--;
            }
        }, deleteSpeed);
    };
}

export default TypeWriter;