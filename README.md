# California License Plates

A silly tool to search the California DMV website for available custom license plate names.

<img width="947" alt="CLI" src="https://user-images.githubusercontent.com/2289/121766364-0fc8eb00-cb06-11eb-83d5-bf86f6b2282b.png">

---

<video src="https://user-images.githubusercontent.com/2289/121821946-1a43cb80-cc51-11eb-8479-5fba90b3f76a.mov" data-canonical-src="https://user-images.githubusercontent.com/2289/121821946-1a43cb80-cc51-11eb-8479-5fba90b3f76a.mov" controls="controls" muted="muted" class="d-block rounded-bottom-2 width-fit" style="max-height:640px;"></video>

## Requirements

🐢🚀 [Node.js](https://nodejs.org/en/)

## Usage

```sh
npm i -g california-license-plates
npx california-license-plates <query> <query> <etc>
```

## Rules

- Select letters, numbers (1-9), and spaces for your license plate. Special or accented characters are not accepted.
- Type a space or leave blank to add a full space.
- Type "/" to add a half-space. Two half-spaces cannot be in a row.
- Minimum of 2 characters.
- Zero (0) is not allowed?


## Tips

Looking for English words that have 7 characters? Use [an-array-of-english-words](https://ghub.io/an-array-of-english-words).

```sh
npm i -g an-array-of-english-words
words | grep -x '.\{7,7\}' | wc -l
```