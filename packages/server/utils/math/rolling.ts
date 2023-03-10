interface hasProb {
  prob: number;
}

interface hasValue {
  value: number;
}

interface hasSourceTable {
  sourceTable: any[];
}

type ProbabilityTable = hasProb & hasSourceTable;

type RollTable = ProbabilityTable;

type PlaceInTable = ProbabilityTable & hasValue;

type RandomRange = hasProb & {
  startFrom?: number;
};

type GetBinFromValue = hasValue & {
  bins: number[];
};

type GetBins = hasProb & {
  range: number;
};

function rollingMean(arr: number[]) {
  let out = [];
  for (let i = 0; i < arr.length - 1; ++i) {
    out.push((arr[i] + arr[i + 1]) / 2);
  }
  return out;
}

export function rollTable({ sourceTable, prob }: RollTable) {
  return sourceTable[
    getSubRangeFromValue({
      value: randomRange({ prob }),
      bins: getSubRanges({ range: sourceTable.length, prob }),
    })
  ];
}

export function placeInTable({ sourceTable, prob, value }: PlaceInTable) {
  return sourceTable[
    getSubRangeFromValue({
      value,
      bins: getSubRanges({ range: sourceTable.length, prob }),
    })
  ];
}

function randomRange({ prob, startFrom = 0 }: RandomRange) {
  return Math.floor(Math.random() * (prob - startFrom + 1)) + startFrom;
}

function getSubRangeFromValue({ value, bins }: GetBinFromValue) {
  return bins.concat(value).sort().indexOf(value);
}

function getSubRanges({ range, prob }: GetBins) {
  return rollingMean(
    [...Array(range).keys()].map(
      (index) => (index * (prob - 1)) / (range - 1) + 1
    )
  );
}
