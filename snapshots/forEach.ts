import * as R from '../ramda/dist/index';

declare const number_list: R.List<number>;
declare const number_tap: R.Tap<number>;

// @dts-jest:pass:snap -> <U extends number[] | ArrayLike<number>>(list: U) => U
R.forEach(number_tap);
// @dts-jest:pass:snap -> number[] | ArrayLike<number>
R.forEach(number_tap)(number_list);
// @dts-jest:pass:snap -> number[] | ArrayLike<number>
R.forEach(number_tap, number_list);
