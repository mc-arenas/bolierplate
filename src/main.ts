/**
 * Some predefined delay values (in milliseconds).
 */
export enum Delays {
  Short = 500,
  Medium = 2000,
  Long = 5000,
}

/**
 * Returns a Promise<string> that resolves after a given time.
 *
 * @param {string} name - A name.
 * @param {number=} [delay=Delays.Medium] - A number of milliseconds to delay resolution of the Promise.
 * @returns {Promise<string>}
 */
function delayedHello(
  name: string,
  delay: number = Delays.Medium,
): Promise<string> {
  return new Promise((resolve: (value?: string) => void) =>
    setTimeout(() => resolve(`Hello, ${name}`), delay),
  );
}

/**
 * Deep copy an object or array.
 *
 * @param {T} input - An object or array.
 * @returns {T} - A deep copy of the input object or array.
 */
type DeepCopy<T> = {
  [K in keyof T]: T[K] extends object ? DeepCopy<T[K]> : T[K];
};

export function copyObject<T>(input: T): DeepCopy<T> {
  if (Array.isArray(input)) {
    return input.map((item) => copyObject(item)) as DeepCopy<T>;
  }

  if (typeof input !== 'object' || input === null) {
    return input as DeepCopy<T>;
  }

  const copy = {} as DeepCopy<T>;
  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      copy[key as keyof T] = copyObject(input[key]) as DeepCopy<T>[keyof T];
    }
  }

  return copy;
}

/**
 * Greets a person with a delayed hello message.
 *
 * @param {string} name - A name.
 * @returns {Promise<string>} - A Promise that resolves to the greeting message.
 */
export async function greeter(name: string): Promise<string> {
  return await delayedHello(name, Delays.Long);
}