/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-extend-native */

declare global {
  interface Map<K, V> {
    incr: (key: K, value: V) => V;
    push: (key: K, value: V) => V;
    concat: (..._maps: Map<K, V>[]) => Map<K, V>;
    nset: (value: V, ...keys: K[]) => Map<K, V>;
    nget: (...keys: K[]) => V;
    nincr: (value: V, ...keys: K[]) => V;
  }
}

Map.prototype.incr = function (key, value) {
  let v = this.get(key);
  if (v === undefined) {
    this.set(key, 0);
    v = 0;
  }
  this.set(key, v + value);
  return this.get(key);
};

Map.prototype.push = function (key, value) {
  if (this.get(key) === undefined) {
    this.set(key, []);
  }
  this.get(key).push(value);
  return this.get(key);
};

Map.prototype.concat = function (..._maps) {
  for (const _map of _maps) {
    _map.forEach((value, key) => {
      this.set(key, value);
    });
  }
  return this;
};

Map.prototype.nset = function (value, ...keys) {
  let s = keys[0];
  for (let i = 1; i < keys.length; i += 1) {
    // @ts-ignore
    s = `${s}=>${keys[i]}`;
  }
  this.set(s, value);
  return this;
};

Map.prototype.nget = function (...keys) {
  let s = keys[0];
  for (let i = 1; i < keys.length; i += 1) {
    // @ts-ignore
    s = `${s}=>${keys[i]}`;
  }
  return this.get(s);
};

Map.prototype.nincr = function (value, ...keys) {
  let v = this.nget(...keys);
  if (v === undefined) {
    this.nset(0, ...keys);
    v = 0;
  }
  this.nset(v + value, ...keys);
  return this.nget(...keys);
};

export default Map;
