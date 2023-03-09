type GetBins = {
  input: any[];
  prob: number;
};

type GetBinFromValue = {
    value: number;
    bins: number[];
}

function rollingMean(arr: number[]) {
  let out = [];
  for (let i = 0; i < arr.length - 1; ++i) {
    out.push((arr[i] + arr[i + 1]) / 2);
  }
  return out;
}

export function getBinFromValue({ value, bins }: GetBinFromValue) {
    return bins.concat(value).sort().indexOf(value);
}

export function getBins({ input, prob }: GetBins) {
  // const probSpace = [...Array(prob).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  // const num = [...input.keys()]; // [0, 1, 2, 3]
  // const optionSpace = input.map((element, index) => ((index * (prob - 1))/(input.length - 1)) + 1);
  return rollingMean(
    input.map((element, index) => (index * (prob - 1)) / (input.length - 1) + 1)
  );
}
