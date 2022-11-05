export function mapObject(obj: { [x: string]: any; }, callback: { call: (arg0: any, arg1: any, arg2: string, arg3: any) => any; }) {
  const result = {};
  Object.keys(obj).forEach(function (key) {
    // @ts-ignore
    result[key] = callback.call(obj, obj[key], key, obj);
  });
  return result;
}
