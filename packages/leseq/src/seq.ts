import { AsyncSeq } from './asyncSeq';

export type Gen<T = unknown> = Generator<T, any, undefined>;
export type Operator<T = any, TResult = T> = (source: Seq<T>) => Gen<TResult>;
export type SeqToValue<T = any, TResult = any> = (source: Seq<T>) => TResult;

export class Seq<T> implements Iterable<T>, AsyncIterable<T> {
  constructor(protected source: Iterable<T>) {}

  [Symbol.iterator](): Iterator<T> {
    return this.source[Symbol.iterator]();
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    const iterator = this[Symbol.iterator]();
    return {
      next: () => Promise.resolve(iterator.next()),
    };
  }

  pipe<T1>(op1: Operator<T, T1>): Seq<T1>;
  pipe<T1, T2>(op1: Operator<T, T1>, op2: Operator<T1, T2>): Seq<T2>;
  pipe<T1, T2, T3>(op1: Operator<T, T1>, op2: Operator<T1, T2>, op3: Operator<T2, T3>): Seq<T3>;
  pipe<T1, T2, T3, T4>(op1: Operator<T, T1>, op2: Operator<T1, T2>, op3: Operator<T2, T3>, op4: Operator<T3, T4>): Seq<T4>;
  pipe<T1, T2, T3, T4, T5>(op1: Operator<T, T1>, op2: Operator<T1, T2>, op3: Operator<T2, T3>, op4: Operator<T3, T4>, op5: Operator<T4, T5>): Seq<T5>;
  pipe<T1, T2, T3, T4, T5, T6>(
    op1: Operator<T, T1>,
    op2: Operator<T1, T2>,
    op3: Operator<T2, T3>,
    op4: Operator<T3, T4>,
    op5: Operator<T4, T5>,
    op6: Operator<T5, T6>
  ): Seq<T6>;
  pipe<T1, T2, T3, T4, T5, T6, T7>(
    op1: Operator<T1, T2>,
    op2: Operator<T2, T3>,
    op3: Operator<T3, T4>,
    op4: Operator<T4, T5>,
    op5: Operator<T5, T6>,
    op6: Operator<T6, T7>
  ): Seq<T7>;
  pipe<T1, T2, T3, T4, T5, T6, T7, T8>(
    op1: Operator<T1, T2>,
    op2: Operator<T2, T3>,
    op3: Operator<T3, T4>,
    op4: Operator<T4, T5>,
    op5: Operator<T5, T6>,
    op6: Operator<T6, T7>,
    op7: Operator<T7, T8>
  ): Seq<T8>;
  pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    op1: Operator<T1, T2>,
    op2: Operator<T2, T3>,
    op3: Operator<T3, T4>,
    op4: Operator<T4, T5>,
    op5: Operator<T5, T6>,
    op6: Operator<T6, T7>,
    op7: Operator<T7, T8>,
    op8: Operator<T8, T9>
  ): Seq<T9>;
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
  ): Seq<T10>;
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
  ): Seq<T11>;
  pipe(...operators: Operator[]): Seq<T> {
    if (operators.length === 0) {
      return this;
    }
    return new PipelineSeq(this, operators);
  }

  value<TResult>(seqToValue: SeqToValue<T, TResult>): TResult {
    return seqToValue(this);
  }

  forEach(func: (arg: T) => void): void {
    for (const i of this) {
      func(i);
    }
  }

  toArray(): T[] {
    return [...this];
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
