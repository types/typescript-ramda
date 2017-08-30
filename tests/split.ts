import * as R_split from '../ramda/dist/src/split';

declare const regex: RegExp;
declare const string: string;

// @dts-jest:pass:snap
R_split(regex);
// @dts-jest:pass:snap
R_split(regex)(string);
// @dts-jest:pass:snap
R_split(regex, string);
