import * as R from '../ramda/dist/index';

declare const number: number;

// @dts-jest:pass:snap
R.subtract(number, number);
// @dts-jest:pass:snap
R.subtract(number)(number);
