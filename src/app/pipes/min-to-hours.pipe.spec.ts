import { MinToHoursPipe } from './min-to-hours.pipe';

describe('MinToHoursPipe', () => {
  it('create an instance', () => {
    const pipe = new MinToHoursPipe();
    expect(pipe).toBeTruthy();
  });
});
