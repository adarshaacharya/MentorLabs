// array
type numArray = Array<number>;

const nums: numArray = [1, 2, 3, 4, 4];

// last
const last = <T>(arr: T[]): T => {
  // t is generic becuase we don't know type of T ahead of time, so use same T as args type and return type is also specified as T
  return arr[arr.length - 1];
};

const l = last<number>([1, 2, 3, 4]);
const xx = last<string>(['1', '2', '3', '4']);

const makeArr = <X, Y>(a: X, b: Y): [X, Y] => {
  return [a, b];
};

const ll = makeArr(5, 10);
const ss = makeArr('a', 'b');
const v3 = makeArr<string | null, number>('a', 5);

// extends
const makeFullName = <T extends { fname: string; lname: string }>(obj: T) => { // can have any type on obj buttt fname: string; lname: string should be there
  return {
    ...obj,
    fullname: obj.fname + ' ' + obj.lname,
  };
};

const v4 = makeFullName({ fname: 'bob', lname: 'jurnior', age: 4 });


// overwrite interface
interface Tab<T> {
  id : string
  position : number
  data : T
}

type TabNumber = Tab<number>
type TabString = Tab<string>
