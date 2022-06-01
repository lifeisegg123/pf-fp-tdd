export type Pass = 1;

export type Fail = 0;

export type Equals<A1, A2> = (<A>() => A extends A2 ? Pass : Fail) extends <
  A
>() => A extends A1 ? Pass : Fail
  ? Pass
  : Fail;

export declare function check<Type, Expect>(
  debug?: Type
): Equals<Equals<Type, Expect>, Pass>;

export declare function checks(checks: Pass[]): void;
