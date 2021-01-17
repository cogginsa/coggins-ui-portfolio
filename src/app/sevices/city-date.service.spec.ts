import { CityDateService } from './city-date.service';

describe('CityDateService', () => {
  let service: CityDateService;
  beforeEach(() => { service = new CityDateService(); });

  const days = ['Sunday', 'Monday', 'Tuesday'];

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given a Date', () => {
    it('should return the string day of the week', () => {
      const dateToTest = new Date("2020-12-15T18:59:14.502605Z");
      expect(service.getDayOfWeek(dateToTest)).toBe(days[2])
    });
  });
});
