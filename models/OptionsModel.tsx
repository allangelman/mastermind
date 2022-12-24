export class OptionsModel {
  numOptions: number;
  currentOption: number = -1;
  options: number[];

  constructor(numOptions: number) {
    this.numOptions = numOptions;
    this.options = [];
    for (let i = 0; i < numOptions; i++) {
      this.options.push(i);
    }
  }

  getOption(number: number): number {
    return this.options[number];
  }

  getCurrentOption(): number {
    return this.currentOption;
  }

  setCurrentOption(number: number): number {
    return (this.currentOption = number);
  }

  getNumOptions(): number {
    return this.numOptions;
  }

  getOptions(): number[] {
    return this.options;
  }
}
