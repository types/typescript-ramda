import * as R from '../ramda/dist/index';

declare const number_string_to_object: (a: number, b: string) => object;
declare const number: number;
declare const string: string;

// @dts-jest:pass:snap -> (args: any[]) => R.Variadic<object>
R.partialRight(number_string_to_object);
// @dts-jest:pass:snap -> R.Variadic<object>
R.partialRight(number_string_to_object, [string]);
// @dts-jest:pass:snap -> object
R.partialRight(number_string_to_object, [string])(number);
