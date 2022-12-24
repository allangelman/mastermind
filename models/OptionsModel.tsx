export class OptionsModel {
  private currentOption: number = -1;
  private options: number[];

  constructor(numOptions: number) {
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

  getOptions(): number[] {
    return this.options;
  }
}
