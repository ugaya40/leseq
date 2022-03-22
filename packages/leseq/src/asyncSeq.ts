export type AsyncGen<T = unknown> = AsyncGenerator<T, any, undefined>;
export type AsyncOperator<T = any, TResult = T> = (source: AsyncSeq<T>) => AsyncGen<TResult>;
export type AsyncSeqToValue<T = any, TResult = any> = (source: AsyncSeq<T>) => Promise<TResult>;

function isAsyncIterable(source: any): source is AsyncIterable<unknown> {
  return Symbol.asyncIterator in source;
}

export class AsyncSeq<T> implements AsyncIterable<T> {
  constructor(protected source: AsyncIterable<T> | Iterable<T>) {}

  [Symbol.asyncIterator](): AsyncIterator<T> {
    if (isAsyncIterable(this.source)) {
      return this.source[Symbol.asyncIterator]();
    } else {
      const iterator = this.source[Symbol.iterator]();
      return {
        next: () => Promise.resolve(iterator.next()),
      };
    }
  }

  pipe<T1>(op1: AsyncOperator<T, T1>): AsyncSeq<T1>;
  pipe<T1, T2>(op1: AsyncOperator<T, T1>, op2: AsyncOperator<T1, T2>): AsyncSeq<T2>;
  pipe<T1, T2, T3>(op1: AsyncOperator<T, T1>, op2: AsyncOperator<T1, T2>, op3: AsyncOperator<T2, T3>): AsyncSeq<T3>;
  pipe<T1, T2, T3, T4>(op1: AsyncOperator<T, T1>, op2: AsyncOperator<T1, T2>, op3: AsyncOperator<T2, T3>, op4: AsyncOperator<T3, T4>): AsyncSeq<T4>;
  pipe<T1, T2, T3, T4, T5>(
    op1: AsyncOperator<T, T1>,
    op2: AsyncOperator<T1, T2>,
    op3: AsyncOperator<T2, T3>,
    op4: AsyncOperator<T3, T4>,
    op5: AsyncOperator<T4, T5>
  ): AsyncSeq<T5>;
  pipe<T1, T2, T3, T4, T5, T6>(
    op1: AsyncOperator<T, T1>,
    op2: AsyncOperator<T1, T2>,
    op3: AsyncOperator<T2, T3>,
    op4: AsyncOperator<T3, T4>,
    op5: AsyncOperator<T4, T5>,
    op6: AsyncOperator<T5, T6>
  ): AsyncSeq<T6>;
  pipe<T1, T2, T3, T4, T5, T6, T7>(
    op1: AsyncOperator<T1, T2>,
    op2: AsyncOperator<T2, T3>,
    op3: AsyncOperator<T3, T4>,
    op4: AsyncOperator<T4, T5>,
    op5: AsyncOperator<T5, T6>,
    op6: AsyncOperator<T6, T7>
  ): AsyncSeq<T7>;
  pipe<T1, T2, T3, T4, T5, T6, T7, T8>(
    op1: AsyncOperator<T1, T2>,
    op2: AsyncOperator<T2, T3>,
    op3: AsyncOperator<T3, T4>,
    op4: AsyncOperator<T4, T5>,
    op5: AsyncOperator<T5, T6>,
    op6: AsyncOperator<T6, T7>,
    op7: AsyncOperator<T7, T8>
  ): AsyncSeq<T8>;
  pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    op1: AsyncOperator<T1, T2>,
    op2: AsyncOperator<T2, T3>,
    op3: AsyncOperator<T3, T4>,
    op4: AsyncOperator<T4, T5>,
    op5: AsyncOperator<T5, T6>,
    op6: AsyncOperator<T6, T7>,
    op7: AsyncOperator<T7, T8>,
    op8: AsyncOperator<T8, T9>
  ): AsyncSeq<T9>;
  pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    op1: AsyncOperator<T1, T2>,
    op2: AsyncOperator<T2, T3>,
    op3: AsyncOperator<T3, T4>,
    op4: AsyncOperator<T4, T5>,
    op5: AsyncOperator<T5, T6>,
    op6: AsyncOperator<T6, T7>,
    op7: AsyncOperator<T7, T8>,
    op8: AsyncOperator<T8, T9>,
    op9: AsyncOperator<T9, T10>
  ): AsyncSeq<T10>;
  pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
    op1: AsyncOperator<T1, T2>,
    op2: AsyncOperator<T2, T3>,
    op3: AsyncOperator<T3, T4>,
    op4: AsyncOperator<T4, T5>,
    op5: AsyncOperator<T5, T6>,
    op6: AsyncOperator<T6, T7>,
    op7: AsyncOperator<T7, T8>,
    op8: AsyncOperator<T8, T9>,
    op9: AsyncOperator<T9, T10>,
    op10: AsyncOperator<T10, T11>
  ): AsyncSeq<T11>;
  pipe(...operators: AsyncOperator[]): AsyncSeq<T> {
    if (operators.length === 0) {
      return this;
    }
    return new AsyncPipelineSeq(this, operators);
  }

  async valueAsync<TResult>(seqToValue: AsyncSeqToValue<T, TResult>): Promise<TResult> {
    return await seqToValue(this);
  }

  async forEachAsync(func: (arg: T) => void): Promise<void> {
    for await (const i of this) {
      await func(i);
    }
  }

  async toMutableArrayAsync(): Promise<T[]> {
    const result: T[] = [];
    await this.forEachAsync(one => result.push(one));
    return result;
  }

  async toArrayAsync(): Promise<readonly T[]> {
    return this.toMutableArrayAsync()
  }
}

class AsyncPipelineSeq<T> extends AsyncSeq<T> {
  constructor(source: AsyncIterable<T>, private operators: AsyncOperator[]) {
    super(source);
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    let nextSource: AsyncSeq<any> = new AsyncSeq(this.source);
    for (const operator of this.operators) {
      nextSource = new AsyncSeq(operator(nextSource));
    }
    return nextSource[Symbol.asyncIterator]();
  }
}
