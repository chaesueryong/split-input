export class SplitInput {
    #className = null;
    #range = null;
    #text = '';
    #child = [];
    #option = {
        inputType: 'number',
    };

    inputEvent = () => {};

    constructor(className, range, option) {
        this.#className = className;
        this.#range = range;
        this.#option = { ...this.#option, ...option };

        this.#defaultSetting();
    }

    #defaultSetting() {
        this.#setDefaultCss();
        this.#renderInput();
        this.#setEvent();
    }

    #setDefaultCss() {
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(''));
        document.head.appendChild(style);

        style.sheet.insertRule(
            '.split-input { display: flex; gap: 10px; }'
            , 0);

        style.sheet.insertRule(
            '.split-input-child { border: none; padding: 3px 0; border-bottom: 3px solid black; text-align: center; background-color: transparent; font-size: 20px; width: 20px; color: #2F2725; }'
            , 1);

        style.sheet.insertRule(
            '.split-input-child:focus { outline: none; }'
            , 2);

        style.sheet.insertRule(
            '.split-input-child:empty:before { content: attr(placeholder); display: block; }'
            , 3);

        style.sheet.insertRule(
            '.split-input-child[placeholder]:empty:before { color: #E6E6E6; }'
            , 4);
    }

    #renderInput() {
        $(`.${this.#className}`).addClass('split-input');

        for(let i = 0; i < this.#range; i++){
            $(`.${this.#className}`).append(`
                <div class="split-input-child" contenteditable="true" placeholder="0"></div>
            `)

            this.#child.push($(`.split-input-child`)[i]);
        }
    }

    #setEvent() {
        for(let i = 0; i < this.#child.length; i++) {
            $(this.#child[i]).on('input keyup', (e) => {
                let value = $(e.target).text();

                if(value.length === 0 && i > 0 && e.keyCode === 8){
                    $(this.#child[i - 1]).focus();

                    if($(this.#child[i - 1]).text().length > 0) {
                        let range = document.createRange();
                        let s = getSelection();

                        range.setStart(this.#child[i - 1], 1);
                        s.removeAllRanges();
                        s.addRange(range);
                    }
                }else {
                    if(this.#option.inputType === 'number'){
                        value = value.replace(/[^0-9]/g,'');
                    }

                    value = value.slice(0, 1);

                    $(e.target).text(value);

                    if(value.length > 0){
                        if(i < this.#range - 1){
                            $(this.#child[i + 1]).focus();
                        }else {
                            let range = document.createRange();
                            let s = getSelection();

                            range.setStart(this.#child[i], 1);
                            s.removeAllRanges();
                            s.addRange(range);
                        }
                    }
                }

                this.#text = '';
                for(let j = 0; j < this.#child.length; j++){
                    this.#text = this.#text.concat($(this.#child[j]).text());
                }

                this.inputEvent();
            })
        }
    }

    setEmptyInputValue() {
        for(let i = 0; i < this.#child.length; i++){
            this.#child[i].textContent = '';
        }
        this.#text = '';
    }

    setInputValue(arr){
        this.#text = '';

        for(let i = 0; i < arr.length; i++){
            this.#child[i].textContent = arr[i];
            this.#text.push(arr[i]);
        }
    }

    getValue() {
        return this.#text;
    }
}