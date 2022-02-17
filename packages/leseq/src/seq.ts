import { toArray } from './values/toArray';

export type Gen<T = unknown> = Generator<T, any, undefined>;
export type Operator<T = any, TResult = any> = (source: Seq<T>) => Gen<TResult>;
export type SeqToValue<T = any, TResult = any> = (source: Seq<T>) => TResult;

function pipe(...operators: Operator[]): (source: Seq<any>) => PipelineSeq<any> {
  return (seq: Seq<any>) => new PipelineSeq(seq, operators);
}

const value =
  <T, TResult>(seqToValue: SeqToValue<T, TResult>) =>
  (seq: Seq<T>) => {
    return seqToValue(seq);
  };

export class Seq<T> {
  constructor(protected source: Iterable<T>) {}

  [Symbol.iterator](): Iterator<T> {
    return this.source[Symbol.iterator]();
  }

  pipe<T1>(op1: Operator<T, T1>): PipelineSeq<T1>;
  pipe<T1, T2>(op1: Operator<T, T1>, op2: Operator<T1, T2>): PipelineSeq<T2>;
  pipe<T1, T2, T3>(op1: Operator<T, T1>, op2: Operator<T1, T2>, op3: Operator<T2, T3>): PipelineSeq<T3>;
  pipe<T1, T2, T3, T4>(op1: Operator<T, T1>, op2: Operator<T1, T2>, op3: Operator<T2, T3>, op4: Operator<T3, T4>): PipelineSeq<T4>;
  pipe<T1, T2, T3, T4, T5>(op1: Operator<T, T1>, op2: Operator<T1, T2>, op3: Operator<T2, T3>, op4: Operator<T3, T4>, op5: Operator<T4, T5>): PipelineSeq<T5>;
  pipe<T1, T2, T3, T4, T5, T6>(
    op1: Operator<T, T1>,
    op2: Operator<T1, T2>,
    op3: Operator<T2, T3>,
    op4: Operator<T3, T4>,
    op5: Operator<T4, T5>,
    op6: Operator<T5, T6>
  ): PipelineSeq<T6>;
  pipe<T1, T2, T3, T4, T5, T6, T7>(
    op1: Operator<T1, T2>,
    op2: Operator<T2, T3>,
    op3: Operator<T3, T4>,
    op4: Operator<T4, T5>,
    op5: Operator<T5, T6>,
    op6: Operator<T6, T7>
  ): PipelineSeq<T7>;
  pipe<T1, T2, T3, T4, T5, T6, T7, T8>(
    op1: Operator<T1, T2>,
    op2: Operator<T2, T3>,
    op3: Operator<T3, T4>,
    op4: Operator<T4, T5>,
    op5: Operator<T5, T6>,
    op6: Operator<T6, T7>,
    op7: Operator<T7, T8>
  ): PipelineSeq<T8>;
  pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    op1: Operator<T1, T2>,
    op2: Operator<T2, T3>,
    op3: Operator<T3, T4>,
    op4: Operator<T4, T5>,
    op5: Operator<T5, T6>,
    op6: Operator<T6, T7>,
    op7: Operator<T7, T8>,
    op8: Operator<T8, T9>
  ): PipelineSeq<T9>;
  pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    op1: Operator<T1, T2>,
    op2: Operator<T2, T3>,
    op3: Operator<T3, T4>,
    op4: Operator<T4, T5>,
    op5: Operator<T5, T6>,
    op6: Operator<T6, T7>,
    op7: Operator<T7, T8>,
    op8: Operator<T8, T9>,
    op9: Operator<T9, T10>
  ): PipelineSeq<T10>;
  pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
    op1: Operator<T1, T2>,
    op2: Operator<T2, T3>,
    op3: Operator<T3, T4>,
    op4: Operator<T4, T5>,
    op5: Operator<T5, T6>,
    op6: Operator<T6, T7>,
    op7: Operator<T7, T8>,
    op8: Operator<T8, T9>,
    op9: Operator<T9, T10>,
    op10: Operator<T10, T11>
  ): PipelineSeq<T11>;
  pipe(...operators: Operator[]): Seq<T> {
    if (operators.length === 0) {
      return this;
    }
    return pipe(...operators)(this);
  }

  value<TResult>(seqToValue: SeqToValue<T, TResult>): TResult {
    return value(seqToValue)(this);
  }

  forEach(func: (arg: T) => void): void {
    for (const i of this) {
      func(i);
    }
  }

  toArray(): T[] {
    return value(toArray<T>())(this);
  }
}

export class PipelineSeq<T> extends Seq<T> {
  constructor(source: Iterable<T>, private operators: Operator[]) {
    super(source);
  }

  [Symbol.iterator](): Iterator<T> {
    let nextSource: Seq<any> = new Seq(this.source);
    for (const operator of this.operators) {
      nextSource = new Seq(operator(nextSource));
    }
    return nextSource[Symbol.iterator]();
  }
}
