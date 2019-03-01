// @flow
import { put } from 'redux-saga/effects';
import createErrorMessage from 'testSaga/createErrorMessage';
import diff from 'jest-diff';
import serializeEffect from 'shared/serializeEffect';

const header = 'hello world';
const stepNumber = 2;

test('includes the assertion number, header and serialized effects', () => {
  const donePut = put({ type: 'DONE' });
  const readyPut = put({ type: 'READY' });
  const effectKey = 'PUT';

  const result = createErrorMessage(
    header,
    stepNumber,
    donePut,
    readyPut,
    effectKey,
  );

  const serializedDonePut = serializeEffect(donePut, effectKey);
  const serializedReadyPut = serializeEffect(readyPut, effectKey);

  const diffOutput = diff(serializedReadyPut, serializedDonePut);
  const expected = `\nAssertion ${stepNumber} failed: ${header}\n\n${diffOutput}`;

  expect(result).toBe(expected);
});

test('includes the assertion number, header and serialized values', () => {
  const actual = 41;
  const expected = 42;

  const result = createErrorMessage(header, stepNumber, actual, expected);

  const serializedActual = serializeEffect(actual);
  const serializedExpected = serializeEffect(expected);

  const diffOutput = diff(serializedExpected, serializedActual);
  const expectedTestResult = `\nAssertion ${stepNumber} failed: ${header}\n\n${diffOutput}`;

  expect(result).toBe(expectedTestResult);
});
