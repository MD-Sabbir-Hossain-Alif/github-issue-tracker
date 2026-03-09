# GitHub Issues Tracker

A simple web app to track github issues using **HTML, CSS (Tailwind + DaisyUI), and JavaScript(Vanilla)**.

---

## Questions & Answer

1. What is the difference between var, let, and const?

    ```
    Answer:

    1. ver is function scoped and hoisted
       let & const block scoped. (hoisted but in TDZ 'tamprol death zone')

    2. var & let can re-assign
       const can't re-assign.

    3. using var we can re-declare
       while let and const we can not re-declare
    ```

2. What is the spread operator (...)?

    ```
    Answer:

    => spread operator is a method we can copy array & object , we can spread or expand array or object element also we can use in string

    1. Copy arrays
    2. Merge arrays
    3. Copy/merge objects
    4. Pass array values into functions
    ```

3. What is the difference between map(), filter(), and forEach()?

    ```
    Answer:

    1. map()
       map can return new array do some thing with array element.
       like: arr.map(a=> a*2) // [1,2] => [2, 4] (transform array)

    2. filter()
       filter method can return all metch element in a new array. (get element base on condition)

    3. forEach()
       forEach method do some thing with array elemnt but didn't return array. (just execute each element of array)
    ```

4. What is an arrow function?

    ```
    Answer:

    Arrow Funcion is a shorter Syntax of function expression (or named function)
    -> we don't need to retun  in single line function and also don't need to write function key word and curly brackets (it's comes in ES6 update)
    ```

5. What are template literals?

    ```
    Answer:

    template literalas use using backtick `` . it's a life easyer ES6 update. we can write multi-line string and we can apply condition. (we can use dynamic value using template literals)
    ```

---

## Features

- Track total Issue, opend, and closed
- Interactive issue list with status indicators
- Dynamicly load and display all issue data from API
- Interactive Search functionality using API calls

---