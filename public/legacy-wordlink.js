/**
 *
 * CODE REVIEW 26-03-2021
 *
 */

const controllerContent = (() => {
  const DOMStrings = {
    d_translatorSelect: ".translator-select",
    d_frameTranslator: "#translator",
    d_translatorDisplayer: ".translator__frame",
    d_container: "#container__content",
    d_title: "#title__content",
    d_text: "#text__content",
    d_card: "#word__card",
    d_btnColoseCard: "#btn__card__close",
    d_btnlevel: ".level",
    span_words: "span.word",
    d_wordDisplay: "#word__display",
    d_selected: ".selected",

    newWords: '.word.new:not([data-type="relative"])',
    linkWords: '.word:not([data-type="relative"],.new,.known)',
    knownWords: '.word.known:not([data-type="relative"]',
    uniqueWords: '.word:not([data-type="relative"])',

    displayNewWords: "#new__words",
    displayLinkWords: "#link__words",
    displayKnownWords: "#known__words",
    displayUniqueWords: "#unique__words",

    btnKnown: "#known",
    btnDelete: "#delete",
  };

  // DISPLAY COUNT NEW-LINK-KNOWN-TOTAL
  const setCount = () => {
    words = document.querySelectorAll(DOMStrings.span_words);

    words.forEach((w) => {
      if (w.dataset.type == null) {
        relatives = document.querySelectorAll(
          `[data-word="${w.dataset.word}"]`
        );

        for (let i = 1; i < relatives.length; i++) {
          if (relatives.length > 1) {
            relatives[i].dataset.type = "relative";
          }
        }
      }
    });

    numNewWords = document.querySelectorAll(DOMStrings.newWords).length;
    numLinkWords = document.querySelectorAll(DOMStrings.linkWords).length;
    numKnownWords = document.querySelectorAll(DOMStrings.knownWords).length;
    numUnique = document.querySelectorAll(DOMStrings.uniqueWords).length;

    displayNew = document.querySelector(DOMStrings.displayNewWords);
    displayLink = document.querySelector(DOMStrings.displayLinkWords);
    displayKnown = document.querySelector(DOMStrings.displayKnownWords);
    displayUnique = document.querySelector(DOMStrings.displayUniqueWords);

    displayNew.textContent = numNewWords;
    displayLink.textContent = numLinkWords;
    displayKnown.textContent = numKnownWords;
    displayUnique.textContent = numUnique;
  };

  const setEvent = () => {
    const switchStatus = (l) => {
      document
        .querySelector(`${DOMStrings.d_btnlevel}.selected`)
        .classList.remove("selected");
      newSelection = document.querySelector(`#${l}`);
      newSelection.classList.add("selected");
    };
    const selectWord = (s_word, level) => {
      words_NODE = document.querySelectorAll(`[data-word="${s_word}"]`);

      words_NODE.forEach((w) => {
        w.classList.value = `word ${level}`;
        w.dataset.level = level;
      });
    };

    const showTranslation = (wn) => {
      let from = [],
        to,
        hash;

      from.push(database._.curr.lang);
      from.push(
        database.tbl.translators.default.languages[database._.curr.lang]
      );
      to = database._.curr.display;

      console.log("> [showTranslation] Starting...");
      console.log(`> [translation] from(${from[0]}) to(${to[0]})`);

      hash = database.tbl.translators.default.hash(
        from[1],
        to[1],
        wn.textContent
      );

      let iframeTranslator = document.querySelector(
        DOMStrings.d_frameTranslator
      );
      let trasnlatorDisplayer = document.querySelector(
        DOMStrings.d_translatorDisplayer
      );

      iframeTranslator.src = hash;
      trasnlatorDisplayer.hidden = false;

      /* */
    };

    const displayCard = (wn) => {
      cardO_NODE = document.querySelector(DOMStrings.d_card);
      wordO_NODE = document.querySelector(DOMStrings.d_wordDisplay);
      wordO_NODE.textContent = wn.textContent;

      /* set btn level selection */
      switchStatus(wn.dataset.level);

      /* new card */
      cardN_NODE = cardO_NODE.cloneNode(true);

      /* remove old */
      cardO_NODE.remove();

      /* visibility */
      cardN_NODE.hidden = false;

      /* display new */
      wn.insertAdjacentElement("afterend", cardN_NODE);

      /* load translation */
      showTranslation(wn);

      const eventCard = (() => {
        const __translations = (() => {
          let translatorSelect;
          translatorSelect = document.querySelector(
            DOMStrings.d_translatorSelect
          );
          translatorSelect.addEventListener("change", (event) => {
            console.log(translatorSelect.value);
          });
        })();

        btnClose = document.querySelector(DOMStrings.d_btnColoseCard);
        btnClose.addEventListener("click", () => {
          cardN_NODE.hidden = true;
          console.warn("- close -");
        });

        /* delete word */
        btnDelete = document.querySelector(DOMStrings.btnDelete);

        btnDelete.addEventListener("click", () => {
          cardN_NODE.hidden = true;

          database._.del("words", wn.dataset.word);

          selectWord(wn.dataset.word, "new"); ///***/ */

          displayNew = document.querySelector(DOMStrings.displayNewWords);
          displayNew.textContent = +displayNew.textContent + 1;

          if (
            document.querySelector(`${DOMStrings.d_selected}#known`) != null
          ) {
            displayKnown = document.querySelector(DOMStrings.displayKnownWords);
            displayKnown.textContent = +displayKnown.textContent - 1;
          } else {
            displayLink = document.querySelector(DOMStrings.displayLinkWords);
            displayLink.textContent = +displayLink.textContent - 1;
          }

          //btnClose.click();
        });

        /* count display */
        btnKnown = document.querySelector(DOMStrings.btnKnown);
        btnKnown.addEventListener("click", () => {
          if (!btnKnown.classList.contains("selected")) {
            displayKnown = document.querySelector(DOMStrings.displayKnownWords);
            displayLink = document.querySelector(DOMStrings.displayLinkWords);

            displayKnown.textContent = +displayKnown.textContent + 1;
            displayLink.textContent = +displayLink.textContent - 1;
          }
        });

        btnLevels = document.querySelectorAll(
          `${DOMStrings.d_btnlevel}:not(#known)`
        );
        btnLevels.forEach((l) => {
          l.addEventListener("click", () => {
            if (
              document.querySelector(`${DOMStrings.d_selected}#known`) != null
            ) {
              displayKnown = document.querySelector(
                DOMStrings.displayKnownWords
              );
              displayLink = document.querySelector(DOMStrings.displayLinkWords);

              displayKnown.textContent = +displayKnown.textContent - 1;
              displayLink.textContent = +displayLink.textContent + 1;
            }
          });
        });
      })();
    };

    const saveWord = (w, l) => {
      let words;

      words = database._.get("words");

      if (words[w] == null) {
        database._.set("words", w, { l: l });
      } else {
        return { error: console.log("> [saveWord] Words already added!") };
      }
    };

    const updateWord = (w, l) => {
      database._.upd("words", w, { l: l });
    };

    const searchWords = (() => {
      console.log("> [] Loading words...");

      savedWords = database._.get("words");

      if (Object.keys(savedWords).length === 0) return false;

      words = document.querySelectorAll('.word:not([data-type="relative"])');

      words.forEach((we) => {
        w = we.dataset.word;

        if (savedWords[w] != undefined) {
          selectWord(w, savedWords[w].l);
        }
      });
    })();

    container_NODE = document.querySelector(DOMStrings.d_container);

    // CLICK WORD ACCTION
    container_NODE.addEventListener("click", (event) => {
      if (event.target.classList.contains("word")) {
        word_NODE = event.target;

        if (word_NODE.dataset.level == "new") {
          /* 1- select pairs */
          selectWord(word_NODE.dataset.word, "_1");

          /* save word */
          saveWord(word_NODE.dataset.word, "_1");

          /* add new link count */
          displayLink = document.querySelector(DOMStrings.displayLinkWords);
          displayNew = document.querySelector(DOMStrings.displayNewWords);
          displayLink.textContent = +displayLink.textContent + 1;
          displayNew.textContent = +displayNew.textContent - 1;
        }

        // CARD EVENTS
        /* 2 - display word container */
        displayCard(word_NODE);

        btnLevel_NODE = document.querySelectorAll(DOMStrings.d_btnlevel);

        btnLevel_NODE.forEach((btn, i) => {
          btn.addEventListener("click", () => {
            // update level
            if (!btn.classList.contains("selected")) {
              //document.querySelector(DOMStrings.d_selected).classList.remove('selected');
              //btn.classList.add('selected');

              level = btn.id;

              switchStatus(level);

              selectWord(word_NODE.dataset.word, level);
              updateWord(word_NODE.dataset.word, level);
            }
          });
        });
      }
    });
  };

  // GET DATA INTO SPAN
  const setData = (id) => {
    data = database._.get("texts")[id];
    if (data == undefined)
      return { error: console.log(">[] no data set (empty)") };

    const str = {
      splitWeP: (str) => {
        /**
         *  :: split words and ponctuation >>> return arrray
         */

        re =
          /[\(\)\[\]\{\}\<\>\’\:\,\‒\–\—\―\…\!\.\«\»\?\;\/\␠\·\&\@\*\\\•\^\¤\¢\$\€\£\¥\₩\₪\†\‡\°\¡\¿\¬\#\№\%\‰\‱\¶\′\§\~\¨\_\|\¦\⁂\☞\∴\‽\※\"]/g;

        return str
          .replace(re, ` $& `)
          .replace(/\s\s+/g, " ")
          .split(" ")
          .filter((el) => el);
      },
      splitAeH: (str) => {
        /* split apostrophe and hyphen at beggin and end of a string >> return array */

        re = /[\'\-]/g;

        bg = [];
        en = [];

        for (let i = 0; i < str.length; i++) {
          if (str.charAt(i).match(re) != null) {
            bg.push(str.charAt(i));
          } else {
            str = str.slice(i);
            break;
          }
        }

        for (let j = str.length - 1; j > 0; j--) {
          if (str.charAt(j).match(re) != null) {
            en.push(str.charAt(j));
            str = str.slice(0, str.length - 1);
          } else {
            en.reverse();
            bg.push(str);
            break;
          }
        }

        return bg.concat(en);
      },
      hasPonctuation: (str) => {
        /* string has ponctuation >> return boolean */
        re =
          /[\(\)\[\]\{\}\<\>\’\:\,\‒\–\—\―\…\!\.\«\»\?\;\/\␠\·\&\@\*\\\•\^\¤\¢\$\€\£\¥\₩\₪\†\‡\°\¡\¿\¬\#\№\%\‰\‱\¶\′\§\~\¨\_\|\¦\⁂\☞\∴\‽\※\"]/g;
        return str.match(re) != null ? true : false;
      },
      hasNumber: (str) => {
        return str.match(/[0-9]/g) != null ? true : false;
      },
      hasAorH: (str) => {
        re = /[\'\-]/g;
        return str.match(re) != null ? true : false;
      },
    };

    const setParagraph = (html) => {
      text_NODE = document.querySelector(DOMStrings.d_text);
      text_NODE.insertAdjacentHTML("beforeend", html);
    };

    title = data.title;
    text = data.text;
    color = data.color;

    container_NODE = document.querySelector(DOMStrings.d_container);
    title_NODE = document.querySelector(DOMStrings.d_title);

    title_NODE.insertAdjacentHTML(
      "beforeend",
      `<h1 class="title">${title}</h1>`
    );
    container_NODE.style.borderLeftColor = color;

    paragraphs = text.split("\n").filter((e) => e);

    paragraphs.forEach((p, i) => {
      words = str.splitWeP(p);
      wList = [];

      words.forEach((w) => {
        if (str.hasPonctuation(w)) {
          span_HTML = `<span class="ponctuation">${w}</span> `;
          wList.push(span_HTML);
        } else if (str.hasNumber(w)) {
          span_HTML = `<span class="number">${w}</span> `;
          wList.push(span_HTML);
        } else if (str.hasAorH(w)) {
          str.splitAeH(w).forEach((s) => {
            if (str.hasAorH(s.charAt(0))) {
              span_HTML = `<span class="ponctuation">${s}</span> `;
              wList.push(span_HTML);
            } else {
              span_HTML = `<span data-word="${s.toLocaleLowerCase()}" data-level="new" class="word new">${s}</span> `;
              wList.push(span_HTML);
            }
          });
        } else {
          span_HTML = `<span data-word="${w.toLocaleLowerCase()}" data-level="new" class="word new">${w}</span> `;
          wList.push(span_HTML);
        }
      });

      p_HTML = `<p class="paragraph paragraph-${i}">${wList.join("")}</p>`;

      setParagraph(p_HTML);
    });

    setEvent();
    setCount();
  };

  // SELECT ACTION

  const selectText = () => {
    function getSelectedText() {
      if (window.getSelection) {
        /*
        try {
          
          let firstEl = window.getSelection().anchorNode.parentElement;
          let quote = document.createElement('span');

          quote.dataset.word = window.getSelection().toString();
          quote.dataset.level = '_1';
          quote.classList.add('word', 'quote');

          quote.hidden = true;
          quote.textContent = window.getSelection().toString();
          firstEl.insertAdjacentElement('beforebegin', quote);
          quote.click();
          quote.remove();

        } catch (error) {}
          */
        return {
          text: window.getSelection().toString(),
          first: window.getSelection().anchorNode.parentElement,
        };
      } else if (document.selection) {
        return { text: document.selection.createRange().text, first: null };
      }
      return "";
    }

    function displayQuote(text, first) {
      let quote;

      /* remove curr selection */
      window.getSelection().removeAllRanges();

      /* create quote elemente */
      quote = document.createElement("span");
      quote.dataset.word = "w_quote_w";
      quote.dataset.level = "new";
      quote.classList.add("word");
      quote.textContent = text;
      quote.hidden = true;

      /* set quote element */
      first.insertAdjacentElement("beforebegin", quote);
      quote.click();
      quote.remove();

      /* ... */
      console.info("> [displayQuote] Starting...");
    }

    document
      .querySelector(DOMStrings.d_text)
      .addEventListener("mouseup", (event) => {
        if (event.target.parentElement.classList.contains("paragraph")) {
          let text, first, selection;

          selection = getSelectedText();
          text = selection.text;
          first = selection.first;

          if (text != "" && first != null) {
            /* translate selection */
            displayQuote(text, first);
          }
        }
      });
  };
  selectText();

  // READ URL ID INPUT
  const urlP = (() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has("id")) {
      id = urlParams.get("id");

      if (database._.get("texts")[id] != null) {
        setData(id);
      } else {
        location.replace("/user/404.html");
        return { error: console.log("> [404] page not found!") };
      }
    } else {
      location.replace("/user/404.html");
      return { error: console.log("> [404] page not found!") };
    }
  })();
})();
