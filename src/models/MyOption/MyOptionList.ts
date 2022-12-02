import MyOption from "./MyOptionInterface";
export default class MyOptionList {
  data: Array<MyOption>;
  constructor(d: Array<MyOption>) {
    this.data = d;
  }
}
