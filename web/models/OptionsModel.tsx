export class OptionsModel {
  private currentOption: number = -1;
  readonly values: number[];

  constructor(numOptions: number) {
    this.values = [];
    for (let i = 0; i < numOptions; i++) {
      this.values.push(i);
    }
  }

  getCurrentOption(): number {
    return this.currentOption;
  }

  setCurrentOption(number: number): number {
    return (this.currentOption = number);
  }
}
