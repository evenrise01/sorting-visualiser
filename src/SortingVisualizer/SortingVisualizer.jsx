import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/MergeSort.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/QuickSort.js';
import { getHeapSortAnimations } from '../sortingAlgorithms/HeapSort.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/BubbleSort.js';



import './SortingVisualizer.css';

function performaceSensitiveFunc() {
  const start = performance.now(); // returns something like 138.899999998509884, which means 138.9 milliseconds passed
  // ...
  const duration = performance.now() - start;
  // report duration
  console.log(duration)
}

// Value for the speed of the animations.
const ANIMATION_SPEED_MS = 4;

// Value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 270;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730)); //if we use 1 instead of 5, we will barely see it on the screen, Also duplicate values are allowed
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }


  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      let [barOne, barTwo, change] = animations[i];
      if (!change) {
        const barOneStyle = arrayBars[barOne].style;
        const barTwoStyle = arrayBars[barTwo].style;
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const barOneStyle = arrayBars[barOne].style;
          barOneStyle.height = `${barTwo}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }


  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      // arrayBars holds all bars in array
      // animations[i] is each pair of bars being compared
      const arrayBars = document.getElementsByClassName('array-bar');
      let [pivotBar, compBar, change] = animations[i];
      //If a swap is not committed, we just highlight the pivot and the value we're comparing to
      if (!change) {
        const pivotBarStyle = arrayBars[pivotBar].style;
        const compBarStyle = arrayBars[compBar].style;
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          pivotBarStyle.backgroundColor = color;
          compBarStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        // This is the case where a swap is happening. Simply set the bar's height to the second bar
        setTimeout(() => {
          const pivotBarStyle = arrayBars[pivotBar].style;
          pivotBarStyle.height = `${compBar}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      let [barOne, barTwo, change] = animations[i];
      if (!change) {
        const barOneStyle = arrayBars[barOne].style;
        const barTwoStyle = arrayBars[barTwo].style;
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const barOneStyle = arrayBars[barOne].style;
          barOneStyle.height = `${barTwo}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    performaceSensitiveFunc();
  }


  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        {/* <button onClick={() => this.SelectionSort()}>Selection Sort</button> */}
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// function arraysAreEqual(arrayOne, arrayTwo) {
//   if (arrayOne.length !== arrayTwo.length) return false;
//   for (let i = 0; i < arrayOne.length; i++) {
//     if (arrayOne[i] !== arrayTwo[i]) {
//       return false;
//     }
//   }
//   return true;
// }
